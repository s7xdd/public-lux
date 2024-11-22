export interface FormLabels {
    elementId: string;
    label: string;
    values?: any[];
  }
  
  export interface Variation {
    id: string;
    galleryImages: { id: string; url: string; width: number; height: number }[];
  }
  
  export interface Border {
    label: string;
    image: string;
  }
  
  export interface LogoField {
    label: string;
    value: string;
  }
  
  export interface CustomizationSectionProps {
    hostName: string;
    slug: string;
  }
  