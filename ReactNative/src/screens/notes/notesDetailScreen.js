import React, {Component} from 'react';
import {Keyboard, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Icon, Content, Form, Textarea} from 'native-base';

export default class NotesDetailScreen extends Component {
  static navigationOptions = (props) => ({
    title: props.navigation.state.params.type === "edit" ? "Notiz bearbeiten" : "Neue Notiz",
    drawerLockMode: 'locked-closed',
    headerRight:
      <TouchableOpacity
        style={{padding: 5, paddingRight: 20}}
        onPress={props.navigation.state.params.onCreateNoteClick}
      >
        <Icon name="add" style={{color: '#fff'}}/>
      </TouchableOpacity>
  })

  constructor() {
    super();
    this.state = {
      noteText: ""
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onCreateNoteClick: this.onCreateNoteClick
    });
  }

  onCreateNoteClick = () => {
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
              autoFocus={true} rowSpan={5}
              bordered placeholder="Notiz eingeben..."
            />
          </Form>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  content: {
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8
  }
});