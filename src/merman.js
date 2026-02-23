import OTM from 'on_the_money';

export default class MermanUI extends OTM {
  constructor(elementId = 'merman-main') {
    super(elementId);
    this.state = {
      viewMode: 'edit',
      currentFile: null
    };
  }

  // OTM methods (render, onStateChange, etc.)
  render() {
    return '<h1>Merman</h1>';
  }
}
