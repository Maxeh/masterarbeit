import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import ActionButton from 'react-native-action-button';
import NotesCard from "./notesCard";

export default class NotesScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Notizen',
  })

  static getDate() {
    let addZero = i => (i < 10) ? (i = "0" + i) : i;

    let date = new Date();
    let day = addZero(date.getDate());
    let month = addZero(date.getMonth() + 1);
    let year = date.getFullYear();
    let hours = addZero(date.getHours());
    let minutes = addZero(date.getMinutes());

    let dateString = [day, month, year].join('/');
    dateString += (" - " + hours + ":" + minutes);
    return dateString;
  }

  constructor() {
    super();
    this.state = {
      notes: [{
        id: Date.now(),
        text:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor " +
        "invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.\n\nAt vero eos " +
        "et accusam et justo duo dolores et ea rebum. 😄😁",
        date: NotesScreen.getDate()
      }, {
        id: Date.now() + 1,
        text:
        "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim " +
        "placerat facer possim assum.\n\nLorem ipsum dolor sit amet, consectetuer adipiscing elit, " +
        "sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.",
        date: NotesScreen.getDate()
      }],
      deleteDialogVisible: false,
      deleteNoteId: null
    }
  }

  onAddNoteClick = () => {
    this.props.navigation.navigate("notesDetailScreen", {
      type: "add",
      onNoteAdded: (note) => this.onNoteAdded(note),
    });
  }

  onNoteAdded = (note) => {
    this.state.notes.push(note);
    this.setState({notes: this.state.notes});
  }

  onEditNoteClick = (id) => {
    let note = null;
    this.state.notes.forEach((n) => {
      if (n.id === id)
        note = n;
    })

    this.props.navigation.navigate("notesDetailScreen", {
      type: "edit",
      noteId: note.id,
      noteText: note.text,
      noteDate: note.date,
      onNoteEdited: (note) => this.onNoteEdited(note),
    });
  }

  onNoteEdited = (note) => {
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.state.notes[i].id === note.id) {
        this.state.notes[i].text = note.text;
        this.state.notes[i].date = note.date;
        this.setState({notes: this.state.notes});
      }
    }
  }

  onDeleteNoteClick = (id) => {
    this.setState({
      deleteDialogVisible: true,
      deleteNoteId: id
    });
  }

  onNoteDeleted = () => {
    this.state.notes = this.state.notes.filter((note) => note.id !== this.state.deleteNoteId);
    this.setState({
      notes: this.state.notes,
      deleteDialogVisible: false
    });
  }

  renderItem = ({item}) =>
    <NotesCard
      note={item}
      onDeleteNoteClick={this.onDeleteNoteClick}
      onEditNoteClick={this.onEditNoteClick}
    />;

  keyExtractor = (item, index) => index.toString();

  render = () => {
    return (
      <View style={{flex: 1}}>
        {this.state.notes.length > 0 &&
        (<FlatList
          data={this.state.notes}
          extraData={this.state.notes}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          contentContainerStyle={{paddingBottom: 80}}
        />)}

        {this.state.notes.length === 0 &&
        (<Text style={{alignSelf: "center", padding: 20}}>Keine Notizen angelegt</Text>)}

        <ConfirmDialog
          titleStyle={{color: "#222"}}
          contentStyle={{padding: 0}}
          title="Wirklich löschen?"
          visible={this.state.deleteDialogVisible}
          onTouchOutside={() => this.setState({deleteDialogVisible: false})}
          negativeButton={{
            title: "Abbrechen",
            titleStyle: {color: "#222"},
            onPress: () => this.setState({deleteDialogVisible: false})
          }}
          positiveButton={{
            title: "Löschen",
            titleStyle: {color: "#f53d3d"},
            onPress: () => this.onNoteDeleted()
          }}>
        </ConfirmDialog>

        <ActionButton
          onPress={this.onAddNoteClick} offsetX={15} offsetY={15}
          fixNativeFeedbackRadius={true} buttonColor="#222"
        />
      </View>
    )
  }
}