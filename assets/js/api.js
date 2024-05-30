/**
 * Async function to fetch data from an external API
 * @param url - The URL to fetch data from
 * @returns Promise | error
 */

const fetchData = async (url) => {
    try {
        const httpheaders = {
            "x-api-key": "live_p159c68QHMRaxMCz7BbIxrFMCCcgO49IVm9gCng0JXD3TorPFdXyLYbHh96lUjxK"
        }
        const response = await fetch(url, {headers: httpheaders});
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Unfortunately this ${error} occured`);
    }
};

/**
   * Fetches a an amount of images based on a required breed
   * @param breed - The breed you want
   * @param apiRoot - The API's root URL
   * @param x - The amount of images you want
   * @returns Promise| Error
   */
const getXImages = async (breed, apiRoot, x) => {
    const url = `${apiRoot}breed_ids=${breed}&limit=${x}`;
    return await fetchData(url);
};

/**
 * Fetches a list of items from the API
 * @param entitySlug - The entity's slug
 * @param apiRoot - The API's root URL
 * @returns Promise | Error>
 */
const getAllBreeds = async (apiRoot) => {
    return await fetchData(apiRoot);
};

/**
 * Fetches paginated data from the API based on page number
 * @param entitySlug - The entity's slug
 * @param pageNumber - The page number to fetch
 * @returns Promise | Error
 */
const getListBasedOnPaginationPage = async (entitySlug, pageNumber, apiRoot) => {
    // create your own pagination logic here
};

export { getXImages, getAllBreeds, getListBasedOnPaginationPage };