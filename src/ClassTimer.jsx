import { Component } from "react";

class ClassTimer extends Component {
  constructor(props) {
    super(props);
    this.STEP = 1000;

    this.NOW_IN_MS = new Date().getTime();
    this.dateTimeAfterDays = this.NOW_IN_MS + this.props.DAYS_IN_MONTHS;
    this.daysOb = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.state = {
      targetDate: this.dateTimeAfterDays,
      countDown: 0,

      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  stopTimerInterval = () => {
    console.log("stoooop");
    clearInterval(this.interval);
  };

  componentDidMount() {
    const { stopTimer, autostart } = this.props;

    if (stopTimer || !autostart) {
      console.log("if " + stopTimer || !autostart);
      this.interval = this.stopTimerInterval();
    } else {
      console.log("else " + stopTimer || !autostart);

      this.interval = this.ChangeDate();
    }
  }
  componentDidUpdate() {
    const { stopTimer, autostart } = this.props;

    if (stopTimer || !autostart) {
      console.log("if " + stopTimer || !autostart);
      this.interval = this.stopTimerInterval();
    } else {
      console.log("else " + stopTimer || !autostart);

      this.interval = this.ChangeDate();
    }
  }

  ChangeDate = () => {
    const countDownDate = new Date(this.state.targetDate).getTime();
    let newDate = this.NOW_IN_MS;
    let countDown = countDownDate - newDate;

    this.interval = setInterval(() => {
      const { stopTimer, autostart } = this.props;

      const state = this.state;
      if (stopTimer || !autostart) return () => this.stopTimerInterval();
      if (!stopTimer) newDate = new Date().getTime();
      countDown = countDownDate - newDate;
      this.setState({
        countDown: countDown,
      });
      console.log("Update" + stopTimer + " " + state.countDown);

      this.setState({
        days: Math.floor(state.countDown / (1000 * 60 * 60 * 24)),
      });
      this.setState({
        hours: Math.floor(
          (state.countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
      });
      this.setState({
        minutes: Math.floor((state.countDown % (1000 * 60 * 60)) / (1000 * 60)),
      });
      this.setState({
        seconds: Math.floor((state.countDown % (1000 * 60)) / 1000),
      });
    }, this.STEP);
  };

  render() {
    if (
      this.state.days +
        this.state.hours +
        this.state.minutes +
        this.state.seconds <=
      0
    ) {
      return (
        <div className="expired-notice">
          <span>{"Час вийшов!!!"}</span>
        </div>
      );
    } else {
      return (
        <div className="show-counter">
          <div className="show-times">
            <div className="countdown">
              <p>{this.state.days}</p>
              <span>Days</span>
            </div>
            <p>:</p>
            <div className="countdown">
              <p>{this.state.hours}</p>
              <span>Hours</span>
            </div>
            <p>:</p>
            <div className="countdown">
              <p>{this.state.minutes}</p>
              <span>Mins</span>
            </div>
            <p>:</p>
            <div className="countdown">
              <p>{this.state.seconds}</p>
              <span>Seconds</span>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default ClassTimer;
