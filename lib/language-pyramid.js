'use babel';

import LanguagePyramidView from './language-pyramid-view';
import { CompositeDisposable } from 'atom';

export default {

  languagePyramidView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languagePyramidView = new LanguagePyramidView(state.languagePyramidViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languagePyramidView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-pyramid:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languagePyramidView.destroy();
  },

  serialize() {
    return {
      languagePyramidViewState: this.languagePyramidView.serialize()
    };
  },

  toggle() {
    console.log('LanguagePyramid was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
