import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Bot,
  MessageCircle,
  Send,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react';

import { propertyService } from '../services/propertyService';
import '../styles/aichat.css';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'openai/gpt-oss-20b';

/* =========================================================
   TEXT HELPERS
========================================================= */

function normalizeText(value = '') {
  return value.toLowerCase().trim();
}

/* =========================================================
   BUDGET PARSER

   Supports:
   80 lakh
   80 lakhs
   1 crore
   1 cr
   50k
   ₹80 lakh
   under 80 lakh
========================================================= */

function parseBudget(value) {
  if (!value) return null;

  const text = normalizeText(value);

  const match = text.match(
    /(?:under|below|upto|up to|within|budget|max(?:imum)?|around|approx(?:imately)?)\s*(?:rs\s*|₹\s*)?(\d+(?:\.\d+)?)\s*(lakh|lakhs|cr|crore|crores|k)?/i
  );

  if (!match) return null;

  const amount = Number(match[1]);
  const unit = (match[2] || '').toLowerCase();

  if (unit === 'lakh' || unit === 'lakhs') {
    return amount * 100000;
  }

  if (
    unit === 'cr' ||
    unit === 'crore' ||
    unit === 'crores'
  ) {
    return amount * 10000000;
  }

  if (unit === 'k') {
    return amount * 1000;
  }

  return amount;
}

/* =========================================================
   PROPERTY TYPE MATCHING
========================================================= */

function getPropertyTypeMatch(text, propertyType) {
  const normalizedType = propertyType.toLowerCase();

  const typeMap = {
    apartment: [
      'apartment',
      'flat',
      '2 bhk',
      '3 bhk',
      '4 bhk',
      'studio',
    ],

    villa: [
      'villa',
      'independent villa',
      'bungalow',
    ],

    'independent house': [
      'independent house',
      'house',
      'builder floor',
    ],

    commercial: [
      'commercial',
      'office',
      'workspace',
      'shop',
      'retail',
    ],
  };

  const keywords =
    typeMap[normalizedType] || [normalizedType];

  return keywords.some((keyword) =>
    text.includes(keyword)
  );
}

/* =========================================================
   FIND BEST PROPERTY MATCHES
========================================================= */

function findBestMatches(input, properties) {
  const text = normalizeText(input);

  if (!properties || !properties.length) {
    return [];
  }

  /* -------------------------------------------------------
     CITY
  ------------------------------------------------------- */

  const cityNames = [
    ...new Set(
      properties
        .map((property) =>
          property.city?.toLowerCase()
        )
        .filter(Boolean)
    ),
  ];

  const preferredCity = cityNames.find((city) =>
    text.includes(city)
  );

  /* -------------------------------------------------------
     PROPERTY TYPE
  ------------------------------------------------------- */

  const propertyTypes = [
    'apartment',
    'villa',
    'independent house',
    'commercial',
  ];

  const preferredType = propertyTypes.find(
    (type) => getPropertyTypeMatch(text, type)
  );

  /* -------------------------------------------------------
     BEDROOMS
  ------------------------------------------------------- */

  const bedroomMatch = text.match(
    /(\d+)\s*(?:bhk|bedroom|bedrooms)/i
  );

  const bedroomCount = bedroomMatch
    ? Number(bedroomMatch[1])
    : null;

  /* -------------------------------------------------------
     BUDGET
  ------------------------------------------------------- */

  const budgetLimit = parseBudget(text);

  /* -------------------------------------------------------
     LOCATION
  ------------------------------------------------------- */

  const preferredLocation = properties
    .map((property) =>
      property.location?.toLowerCase()
    )
    .filter(Boolean)
    .find((location) =>
      text.includes(location)
    );

  /* -------------------------------------------------------
     SCORE PROPERTIES
  ------------------------------------------------------- */

  const scoredProperties = properties.map(
    (property) => {
      let score = 0;

      const propertyCity =
        property.city?.toLowerCase() || '';

      const propertyType =
        property.type?.toLowerCase() || '';

      const propertyLocation =
        property.location?.toLowerCase() || '';

      /* CITY */

      if (
        preferredCity &&
        propertyCity === preferredCity
      ) {
        score += 10;
      }

      /* PROPERTY TYPE */

      if (
        preferredType &&
        propertyType === preferredType
      ) {
        score += 8;
      }

      /* BEDROOM */

      if (
        bedroomCount &&
        Number(property.bedrooms) === bedroomCount
      ) {
        score += 8;
      }

      /* LOCATION */

      if (
        preferredLocation &&
        propertyLocation === preferredLocation
      ) {
        score += 7;
      }

      /* USER TEXT LOCATION MATCH */

      if (
        text.includes(propertyCity) ||
        text.includes(propertyLocation)
      ) {
        score += 3;
      }

      /* PROPERTY TYPE TEXT MATCH */

      if (
        propertyType &&
        text.includes(propertyType)
      ) {
        score += 3;
      }

      /* BUDGET */

      if (budgetLimit && property.price) {
        const propertyPrice =
          Number(property.price);

        if (propertyPrice <= budgetLimit) {
          score += 6;
        } else {
          const difference =
            Math.abs(
              propertyPrice - budgetLimit
            );

          if (
            difference <=
            budgetLimit * 0.15
          ) {
            score += 2;
          }
        }
      }

      /* FEATURED */

      if (property.featured) {
        score += 2;
      }

      return {
        ...property,
        score,
      };
    }
  );

  /* -------------------------------------------------------
     SORT
  ------------------------------------------------------- */

  scoredProperties.sort(
    (a, b) => b.score - a.score
  );

  if (!scoredProperties.length) {
    return [];
  }

  /* -------------------------------------------------------
     TAKE STRONG MATCHES

     This allows some variation when multiple properties
     have similar scores.
  ------------------------------------------------------- */

  const highestScore =
    scoredProperties[0].score;

  const strongMatches =
    scoredProperties.filter(
      (property) =>
        property.score >= highestScore - 2
    );

  /* -------------------------------------------------------
     SHUFFLE SIMILAR MATCHES

     Prevents exactly the same 3 properties from being
     returned every time.
  ------------------------------------------------------- */

  const shuffled =
    [...strongMatches].sort(
      () => Math.random() - 0.5
    );

  /* -------------------------------------------------------
     IF NOT ENOUGH STRONG MATCHES, ADD NEXT BEST
  ------------------------------------------------------- */

  if (shuffled.length < 3) {
    const remaining =
      scoredProperties.filter(
        (property) =>
          !shuffled.some(
            (selected) =>
              selected.id === property.id
          )
      );

    shuffled.push(
      ...remaining.slice(
        0,
        3 - shuffled.length
      )
    );
  }

  return shuffled.slice(0, 3);
}

/* =========================================================
   FALLBACK RESPONSE

   Used if Groq API is unavailable.
========================================================= */

function buildRecommendationReply(
  input = '',
  properties = []
) {
  if (!properties.length) {
    return (
      'I am unable to find property listings right now. ' +
      'Please try again in a moment.'
    );
  }

  const matches =
    findBestMatches(
      input,
      properties
    );

  const selected =
    matches.length
      ? matches
      : properties
          .filter(
            (property) =>
              property.featured
          )
          .slice(0, 3);

  if (!selected.length) {
    return (
      'I could not find a suitable match. ' +
      'Please share your preferred city, budget, or property type.'
    );
  }

  const intro = input.trim()
    ? 'Based on your requirements, here are some suitable properties:'
    : 'Here are a few properties you may like:';

  const lines = [
    intro,
    '',
  ];

  selected.forEach(
    (property, index) => {
      lines.push(
        `${index + 1}. ${property.name || 'Property'}`
      );

      lines.push(
        `Type: ${property.type || 'Residential'}`
      );

      lines.push(
        `City: ${property.city || 'N/A'}`
      );

      lines.push(
        `Location: ${property.location || 'N/A'}`
      );

      lines.push(
        `Budget: ${
          property.priceDisplay ||
          'Price on request'
        }`
      );

      lines.push(
        `Bedrooms: ${
          property.bedrooms || 'N/A'
        } BHK`
      );

      lines.push(
        `Why it fits: ${
          property.description
            ? property.description.slice(
                0,
                120
              )
            : 'A suitable option based on the available listing details.'
        }`
      );

      lines.push('');
    }
  );

  lines.push(
    'Would you like something more affordable, more spacious, or in a different location?'
  );

  return lines.join('\n');
}

/* =========================================================
   GENERATE GROQ RESPONSE
========================================================= */

async function generateReply(
  input,
  properties = [],
  history = []
) {
  const normalizedHistory =
    history
      .filter(
        (item) =>
          item &&
          typeof item.text === 'string' &&
          item.text.trim()
      )
      .slice(-8)
      .map((item) => ({
        role:
          item.role === 'user'
            ? 'user'
            : 'assistant',
        content: item.text.trim(),
      }));

  const matches =
    findBestMatches(
      input,
      properties
    );

  const selectedProperties =
    matches.length
      ? matches
      : properties
          .filter(
            (property) =>
              property.featured
          )
          .slice(0, 5);

  const propertyList =
    (properties || [])
      .map(
        (property) =>
          `- ID: ${property.id || 'N/A'}
Name: ${property.name || 'N/A'}
Type: ${property.type || 'N/A'}
City: ${property.city || 'N/A'}
Location: ${property.location || 'N/A'}
Price: ${property.priceDisplay || 'N/A'}
Bedrooms: ${property.bedrooms || 'N/A'} BHK
Description: ${
            property.description
              ? property.description.slice(
                  0,
                  200
                )
              : 'N/A'
          }`
      )
      .join('\n\n');

  const systemPrompt = `
You are Realistae AI, a friendly and professional real-estate assistant.

Your job is to help users discover properties and answer general questions about the Realistae property platform.

You can have normal conversations with users.
If the user greets you, respond naturally.
If the user asks a general question, answer naturally and conversationally.
If the user asks what you can do, explain that you can help find properties based on city, budget, BHK, property type, and location.

When the user asks about properties, recommend ONLY properties from the provided property data.
Never invent a property.
Never invent a price.
Never invent a location.
Never invent BHK counts.
Never invent property specifications.
Never mention the user's name.
Never ask for the user's name.
Recommend a maximum of 3 properties.
Prioritize:
- City
- Location
- Budget
- Property type
- BHK / bedrooms
If exact matches are unavailable, recommend the closest available properties and clearly explain that they are alternatives.

Keep responses concise, professional, friendly, natural, and mobile-friendly.
Do not produce huge paragraphs.
Do not repeatedly recommend the exact same properties when other suitable options are available.

PROPERTY DATA:
${propertyList || 'No property data available.'}

USER MESSAGE CONTEXT:
Use the recent conversation history to understand follow-up questions such as budget changes, city switches, or “show me more options”.

Response format for property searches:
1. Property Name
Type: ...
City: ...
Location: ...
Price: ...
Bedrooms: ... BHK
Why it fits: ...
2. Property Name
...

After the recommendations, ask one short follow-up question.
`;

  if (!GROQ_API_KEY) {
    return buildRecommendationReply(
      input,
      properties
    );
  }

  try {
    const messages = [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...normalizedHistory,
      {
        role: 'user',
        content: input,
      },
    ];

    try {
      const response =
        await axios.post(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            model: GROQ_MODEL,
            messages,
            temperature: 0.6,
            max_completion_tokens: 500,
          },
          {
            headers: {
              Authorization:
                `Bearer ${GROQ_API_KEY}`,
              'Content-Type':
                'application/json',
            },
          }
        );

      console.log(
        'GROQ RESPONSE:',
        response.data
      );

      const content =
        response?.data?.choices?.[0]
          ?.message?.content;

      if (content) {
        return content;
      }

      return 'Sorry, I could not process your request right now.';
    } catch (error) {
      console.error(
        'GROQ STATUS:',
        error.response?.status
      );
      console.error(
        'GROQ ERROR:',
        error.response?.data
      );
      console.error(
        'GROQ MESSAGE:',
        error.message
      );

      return "Sorry, I couldn't process your request right now.";
    }
  } catch (error) {
    console.error(
      'GROQ STATUS:',
      error.response?.status
    );
    console.error(
      'GROQ ERROR:',
      error.response?.data
    );
    console.error(
      'GROQ MESSAGE:',
      error.message
    );

    return "Sorry, I couldn't process your request right now.";
  }
}

/* =========================================================
   AI CHAT COMPONENT
========================================================= */

export default function AIChat() {
  const [isOpen, setIsOpen] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [properties, setProperties] =
    useState([]);

  const chatEndRef =
    useRef(null);

  /* =======================================================
     TIME
  ======================================================= */

  const getTime = () =>
    new Date().toLocaleTimeString(
      [],
      {
        hour: '2-digit',
        minute: '2-digit',
      }
    );

  /* =======================================================
     INITIAL MESSAGE

     IMPORTANT:
     NO USER NAME
  ======================================================= */

  const [messages, setMessages] =
    useState([
      {
        role: 'bot',

        html: `
          <div class="assistant-intro">
            <p class="assistant-eyebrow">PROPERTY ADVISORY</p>
            <p class="assistant-greeting">What kind of property are you looking for?</p>
            <p class="assistant-description">
              Share your preferred location, budget, and requirements. I’ll shortlist relevant listings from Realistae.
            </p>
            <div class="recommendation-prompts" aria-label="Property search suggestions">
              <button class="recommendation-prompt" data-message="Recommend a 2 BHK apartment in Hyderabad under 1 crore">2 BHK in Hyderabad</button>
              <button class="recommendation-prompt" data-message="Suggest a luxury villa in Bangalore">Luxury villa in Bangalore</button>
              <button class="recommendation-prompt" data-message="Show family homes in Pune with 3 bedrooms">Family home in Pune</button>
              <button class="recommendation-prompt" data-message="Recommend commercial properties in Chennai">Commercial property</button>
            </div>
          </div>
        `,

        time: getTime(),
      },
    ]);

  /* =======================================================
     LOAD PROPERTY DATA
  ======================================================= */

  useEffect(() => {
    const loadProperties =
      async () => {
        try {
          const data =
            await propertyService.getProperties(
              false
            );

          setProperties(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (error) {
          console.error(
            'Failed to load properties:',
            error
          );

          setProperties([]);
        }
      };

    loadProperties();
  }, []);

  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView(
      {
        behavior: 'smooth',
      }
    );
  }, [messages, loading]);

  /* =======================================================
     QUICK SERVICE CARD CLICK
  ======================================================= */

  useEffect(() => {
    const handleServiceClick =
      (event) => {
        const button =
          event.target.closest(
            '.recommendation-prompt'
          );

        const quickText =
          button?.getAttribute(
            'data-message'
          );

        if (quickText) {
          sendQuickMessage(
            quickText
          );
        }
      };

    document.addEventListener(
      'click',
      handleServiceClick
    );

    return () => {
      document.removeEventListener(
        'click',
        handleServiceClick
      );
    };
  }, [
    properties,
    loading,
  ]);

  /* =======================================================
     FORMAT BOT RESPONSE
  ======================================================= */

  const formatBotText = (
    text
  ) => {
    if (!text) return '';

    return text
      .replace(/\*\*/g, '')
      .replace(/###/g, '')
      .replace(/```/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  /* =======================================================
     QUICK MESSAGE
  ======================================================= */

  const sendQuickMessage =
    async (quickText) => {
      if (loading) return;

      const userMsg = {
        role: 'user',

        text: quickText,

        time: getTime(),
      };

      setMessages(
        (prev) => [
          ...prev,
          userMsg,
        ]
      );

      setLoading(true);

      try {
        const aiReply =
          await generateReply(
            quickText,
            properties,
            messages
          );

        const botMsg = {
          role: 'bot',

          text: aiReply,

          time: getTime(),
        };

        setMessages(
          (prev) => [
            ...prev,
            botMsg,
          ]
        );
      } catch (error) {
        console.error(
          'Chat recommendation error:',
          error
        );

        setMessages(
          (prev) => [
            ...prev,
            {
              role: 'bot',

              text:
                'I could not load property suggestions right now. Please try again.',

              time: getTime(),
            },
          ]
        );
      } finally {
        setLoading(false);
      }
    };

  /* =======================================================
     SEND NORMAL MESSAGE
  ======================================================= */

  const sendMessage =
    async () => {
      if (
        !message.trim() ||
        loading
      ) {
        return;
      }

      const userText =
        message.trim();

      const userMsg = {
        role: 'user',

        text: userText,

        time: getTime(),
      };

      setMessages(
        (prev) => [
          ...prev,
          userMsg,
        ]
      );

      setMessage('');

      setLoading(true);

      try {
        const aiReply =
          await generateReply(
            userText,
            properties,
            messages
          );

        const botMsg = {
          role: 'bot',

          text: aiReply,

          time: getTime(),
        };

        setMessages(
          (prev) => [
            ...prev,
            botMsg,
          ]
        );
      } catch (error) {
        console.error(
          'Chat recommendation error:',
          error
        );

        setMessages(
          (prev) => [
            ...prev,
            {
              role: 'bot',

              text:
                'I could not load property suggestions right now. Please try again.',

              time: getTime(),
            },
          ]
        );
      } finally {
        setLoading(false);
      }
    };

  /* =======================================================
     ENTER KEY
  ======================================================= */

  const handleKeyDown =
    (event) => {
      if (
        event.key === 'Enter' &&
        !event.shiftKey
      ) {
        event.preventDefault();

        sendMessage();
      }
    };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      {/* ===================================================
          FLOATING CHAT BUTTON
      =================================================== */}

      {!isOpen && (
        <button
          className="chat-fab"
          onClick={() =>
            setIsOpen(true)
          }
          aria-label="Open property assistant"
        >
          <MessageCircle
            size={28}
            color="#fff"
          />
        </button>
      )}


      {/* ===================================================
          CHAT WINDOW
      =================================================== */}

      {isOpen && (
        <div className="chat-wrapper">

          {/* ===============================================
              HEADER
          =============================================== */}

          <div className="chat-header">

            <div className="header-left">

              <div className="header-icon">
                <Bot size={18} />
              </div>

              <div>

                <div className="header-title">
                  Realistae AI Guide
                </div>

                <div className="header-status">
                  Property Match
                </div>

              </div>

            </div>


            <button
              className="close-btn"
              onClick={() =>
                setIsOpen(false)
              }
              aria-label="Close chat"
            >
              <X size={16} />
            </button>

          </div>


          {/* ===============================================
              CHAT BODY
          =============================================== */}

          <div className="chat-body">

            {messages.map(
              (msg, index) => (

                <div
                  key={`${msg.role}-${index}`}
                  className={`msg-row ${
                    msg.role === 'user'
                      ? 'user-row'
                      : 'bot-row'
                  }`}
                >

                  {/* BOT AVATAR */}

                  {msg.role ===
                    'bot' && (
                    <div className="avatar bot-avatar">
                      <Sparkles
                        size={16}
                      />
                    </div>
                  )}


                  {/* MESSAGE */}

                  <div className="msg-wrapper">

                    <div
                      className={`msg ${
                        msg.role ===
                        'user'
                          ? 'user'
                          : 'bot'
                      }`}
                    >

                      {msg.html ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              msg.html,
                          }}
                        />
                      ) : (
                        formatBotText(
                          msg.text
                        )
                          .split('\n')
                          .map(
                            (
                              line,
                              lineIndex
                            ) => (
                              <div
                                key={`${lineIndex}-${line}`}
                              >
                                {line ||
                                  '\u00A0'}
                              </div>
                            )
                          )
                      )}

                    </div>


                    {/* TIME */}

                    <div
                      className={`msg-time ${
                        msg.role ===
                        'user'
                          ? 'time-right'
                          : 'time-left'
                      }`}
                    >
                      {msg.time}
                    </div>

                  </div>


                  {/* USER AVATAR */}

                  {msg.role ===
                    'user' && (
                    <div className="avatar user-avatar">
                      <UserRound
                        size={16}
                      />
                    </div>
                  )}

                </div>
              )
            )}


            {/* =============================================
                TYPING INDICATOR
            ============================================= */}

            {loading && (
              <div className="msg-row bot-row">

                <div className="avatar bot-avatar">
                  <Sparkles
                    size={16}
                  />
                </div>

                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            )}


            <div ref={chatEndRef} />

          </div>


          {/* ===============================================
              INPUT
          =============================================== */}

          <div className="chat-input">

            <input
              type="text"
              value={message}
              placeholder="Ask for a city, budget, BHK, or property type..."
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              disabled={loading}
            />

            <button
              onClick={sendMessage}
              disabled={
                loading ||
                !message.trim()
              }
              aria-label="Send message"
            >
              <Send size={18} />
            </button>

          </div>

        </div>
      )}
    </>
  );
}