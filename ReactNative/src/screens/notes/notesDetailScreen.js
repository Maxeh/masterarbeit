import React, {Component} from 'react';
import {Keyboard, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Content, Form, Textarea} from 'native-base';
import NotesScreen from "./notesScreen"

export default class NotesDetailScreen extends Component {
  static navigationOptions = (props) => ({
    title: props.navigation.state.params.type === "edit" ? "Notiz bearbeiten" : "Neue Notiz",
    drawerLockMode: 'locked-closed',
    headerRight:
      <TouchableOpacity
        style={{padding: 5, paddingRight: 20}}
        onPress={props.navigation.state.params.onCreateOrEditNoteClick}
      >
        {props.navigation.state.params.type === "add" &&
        <Icon name="add" style={{color: '#fff'}}/>}

        {props.navigation.state.params.type === "edit" &&
        <Icon name="md-create" style={{color: '#fff'}}/>}
      </TouchableOpacity>
  })

  constructor() {
    super();
    this.state = {
      noteId: null,
      noteText: "",
      noteDate: null
    }
  }

  componentWillMount() {
    if (this.props.navigation.state.params.type === "edit") {
      this.setState({
        noteId: this.props.navigation.state.params.noteId,
        noteText: this.props.navigation.state.params.noteText,
        noteDate: this.props.navigation.state.params.noteDate
      })
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onCreateOrEditNoteClick: this.onCreateOrEditNoteClick
    });
  }

  onCreateOrEditNoteClick = () => {
    let note = {
      id: this.state.noteId,
      text: this.state.noteText,
      date: this.state.noteDate
    }

    if (this.props.navigation.state.params.type === "edit") {
      note.date = NotesScreen.getDate();
      this.props.navigation.state.params.onNoteEdited(note);
    }
    else if (this.props.navigation.state.params.type === "add") {
      note.id = Date.now();
      note.date = NotesScreen.getDate();
      this.props.navigation.state.params.onNoteAdded(note);
    }

    Keyboard.dismiss();
    this.props.navigation.pop();
  }

  render() {
    return (
      <View style={styles.view}>
        <Content style={styles.content}>
          <Form>
            <Textarea
              style={{backgroundColor: '#fff'}}
              autoFocus={true} rowSpan={7}
              bordered placeholder="Notiz eingeben..."
              onChangeText={(noteText) => this.setState({noteText})}
              value={this.state.noteText}
            />
          </Form>
          <View style={{marginTop: 2}}>
            <Text>{NotesScreen.getDate()}</Text>
          </View>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FEFEFE"
  },
  content: {
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8
  }
});