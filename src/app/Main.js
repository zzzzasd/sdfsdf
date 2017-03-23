/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';

// Material UI stuffs
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

// Styling stuffs
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.tick = this.tick.bind(this)
    this.state = {
      open: false,
      controlledDate: null,
      count:0,
      hours:0,
      minutes:0,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
    console.log("Handle change triggered", date);
    // If this console log will only return date, howTF i'd know this proc?
    // isnt that ok ? the problem is the "4" right EXACTLY.
    // if u dont console log properly, how u know what is what is what?
  };

  componentDidMount (){
    this.interval = setInterval(this.tick, 1000)
  }

  tick() {
    this.setState({
      count: (this.state.controlledDate - this.props.start)/(86400000),
      hours: ((this.state.controlledDate - this.props.start)/(3600000))%24,
      minutes: ((this.state.controlledDate - this.props.start)/(60000))%60,
      seconds: ((this.state.controlledDate - this.props.start)/(1000))%60,

  });
    console.log("count", this.state.count)

  }

  calculateDelta() {
    // logic goes here | can do this without setState?

    this.setState({days: (new Date(this.state.count).getDay())})

    console.log("calculateDelta: ", this.state.count);
  }

  times
  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>

          <h1>My Fap Timer</h1>
          <DatePicker
            hintText="Controlled Date Input"
            value={this.state.controlledDate}
            onChange={this.handleChange}
          />
          <h2> {Math.floor(this.state.count)} days </h2>
          <h3> {Math.floor(this.state.hours)} hours </h3>
          <h4> {Math.floor(this.state.minutes)} minutes </h4>
          <h5> {Math.floor(this.state.seconds)} seconds </h5>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;

// <Dialog
//   open={this.state.open}
//   title="SUPER COOL POPUP"
//   actions={standardActions}
//   onRequestClose={this.handleRequestClose}
// >
//   <h1>POP UP CONTENT</h1>
// </Dialog>
// <RaisedButton
//   label="Super Secret Password"
//   secondary={true}
//   onTouchTap={this.handleTouchTap} />
