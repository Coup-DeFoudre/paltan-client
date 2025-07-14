import { MotionValue } from 'framer-motion';

declare module '*.svg' {
  const content: any;
  export default content;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dock-label': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        isHovered?: MotionValue<number>;
      };
      'dock-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        isHovered?: MotionValue<number>;
      };
    }
  }
}
