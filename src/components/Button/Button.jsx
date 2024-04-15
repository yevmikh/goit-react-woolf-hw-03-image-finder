import moduleCss from './button.module.css';

const Button = ({ onClick, children }) => (
  <button className={moduleCss.buttonMore} onClick={onClick}>
    {children}
  </button>
);

export default Button;
