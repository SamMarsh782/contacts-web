import './inputs.css';

const Switch = ({ varTrue, setVarTrue }) => {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={varTrue}
        onChange={() => setVarTrue(!varTrue)}
      />
      <span className="slider"></span>
    </label>
  )
};

export default Switch;
