import { request, gql } from 'graphql-request'

const MAIN_URL = 'https://api-eu-west-2.hygraph.com/v2/cltlhae8j18fb06w9uiwzva3g/master';

const getSlider = async () => {
    const query = gql`
        query GetSlider {
            sliders {
                id
                name
                image {
                    url
                }
            }
        }
    `;

    try {
        const result = await request(MAIN_URL, query);
        return result;
    } catch (error) {
        throw error;
    }
};

const getCategory = async () => {
    const query = gql`
        query GetCategory {
            categories {
                id
                name
                icon {
                    url
                }
            }
        }
    `;

    try {
        const result = await request(MAIN_URL, query);
        return result;
    } catch (error) {
        throw error;
    }
}

const getBusinessList = async () => {
    const query = gql`
        query GetBusinessList {
            businessLists {
                id
                name
                email
                address
                contactPerson
                category {
                    name
                }
                images {
                    url
                }
                about
            }
        }
    `;

    try {
        const result = await request(MAIN_URL, query);
        return result;
    } catch (error) {
        throw error;
    }
};

const getBusinessListByCategory = async (category: string | string[] ) => {
    const query = gql`
        query GetBusinessListByCategory {
            businessLists(where: {category: {name: "`+category+`"}}) {
                id
                name
                email
                address
                contactPerson
                category {
                    name
                }
                images {
                    url
                }
                about
            }
        }
    `;

    try {
        const result = await request(MAIN_URL, query);
        return result;
    } catch (error) {
        throw error;
    }
};

export default {
    getSlider,
    getCategory,
    getBusinessList,
    getBusinessListByCategory,
}
