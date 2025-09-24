export interface ProductCardProps {
  tag: string;
  title: string;
  description: string;
  primaryButtonText: string;
  highlightValue: string;
  highlightDescription?: string;
  features: string[];
  secondaryActionText?: string;
  primaryButtonAction?: () => void;
}