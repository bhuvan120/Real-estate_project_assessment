import propertiesData from '../data/properties.json';

/**
 * Simulates a network delay.
 * @param {number} ms - Milliseconds to delay.
 * @returns {Promise}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Services layer to abstract property data access.
 * Ready to be swapped with Axios or Fetch API later.
 */
export const propertyService = {
  /**
   * Fetches all properties.
   * @param {boolean} simulateDelay - Whether to simulate a network delay.
   * @returns {Promise<Array>} List of properties.
   */
  async getProperties(simulateDelay = true) {
    if (simulateDelay) {
      await delay(600); // Simulate network latency
    }
    return [...propertiesData];
  },

  /**
   * Fetches a single property by its ID.
   * @param {number|string} id - The property ID.
   * @param {boolean} simulateDelay - Whether to simulate a network delay.
   * @returns {Promise<Object|null>} The property object or null if not found.
   */
  async getPropertyById(id, simulateDelay = true) {
    if (simulateDelay) {
      await delay(400); // Simulate network latency
    }
    const numericId = parseInt(id, 10);
    const property = propertiesData.find((p) => p.id === numericId);
    return property ? { ...property } : null;
  },

  /**
   * Fetches related properties based on the current property type or city.
   * Excludes the current property itself from the results.
   * @param {Object} currentProperty - The active property.
   * @param {number} limit - Maximum number of related properties to return.
   * @returns {Promise<Array>} List of related properties.
   */
  async getRelatedProperties(currentProperty, limit = 3) {
    await delay(300); // Simulate quick latency
    if (!currentProperty) return [];

    // Filter by same city or same type, excluding current property
    const related = propertiesData.filter(
      (p) =>
        p.id !== currentProperty.id &&
        (p.city.toLowerCase() === currentProperty.city.toLowerCase() ||
          p.type.toLowerCase() === currentProperty.type.toLowerCase())
    );

    // Sort: prioritize matching both, then type, then city
    related.sort((a, b) => {
      const aMatchesCity = a.city.toLowerCase() === currentProperty.city.toLowerCase();
      const aMatchesType = a.type.toLowerCase() === currentProperty.type.toLowerCase();
      const bMatchesCity = b.city.toLowerCase() === currentProperty.city.toLowerCase();
      const bMatchesType = b.type.toLowerCase() === currentProperty.type.toLowerCase();

      if (aMatchesCity && aMatchesType && !(bMatchesCity && bMatchesType)) return -1;
      if (bMatchesCity && bMatchesType && !(aMatchesCity && aMatchesType)) return 1;
      return 0;
    });

    return related.slice(0, limit);
  }
};
