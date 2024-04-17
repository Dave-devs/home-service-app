import { ImageSourcePropType } from "react-native";

export interface OnboardingData {
    id: number,
    image: ImageSourcePropType,
    title: string,
    description: string,
    background: string,
    textColor: string,
}

export interface Sliders {
    id: string,
    name: string,
    image: {
        url: string
    }
}

export interface Categories {
    id: string,
    name: string,
    icon: {
        url: string
    }
}

export interface BusinessList {
    id: string,
    name: string,
    email: string,
    address: string,
    contactPerson: string,
    category: {
        name: string,
    },
    images: {
        url: string,
    },
    about: string
}