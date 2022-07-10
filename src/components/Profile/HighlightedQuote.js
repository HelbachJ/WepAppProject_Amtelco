import classes from './HighlightedQuote.module.css';

const HighlightedAppointment = (props) => {
  return (
    <figure className={classes.quote}>
      <figcaption>{props.name}</figcaption>
      <figcaption>{props.startTime}</figcaption>
      <figcaption>{props.endTime}</figcaption>
      <p>{props.description}</p>
      <p>{props.timeStamp}</p>
    </figure>
  );
};

export default HighlightedAppointment;
