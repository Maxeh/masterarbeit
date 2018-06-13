import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ConfirmDialog} from 'react-native-simple-dialogs';
import ActionButton from 'react-native-action-button';
import NotesCard from "./notesCard";

export default class NotesScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Notizen',
  })

  constructor() {
    super();
    this.state = {
      startNotes: ["hh"],
      notes: [],
      deleteDialogVisible: false
    }
  }

  componentWillMount() {
    this.state.startNotes.forEach((city) => {
      //
    })
  }

  onAddNoteClick = () => {
    this.props.navigation.navigate("notesDetailScreen", {type: "add"});

    //purecomponent?
  }

  renderItem = ({item}) => <NotesCard city={item} onCardDeleteCityClick={this.onCardDeleteCityClick}/>;

  keyExtractor = (item, index) => index.toString();

  render = () => {
    return (
      <View style={{flex: 1}}>
        {this.state.notes.length > 0 &&
        (<FlatList
          data={this.state.notes}
          extraData={this.state}
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
            onPress: () => this.onDeleteCityClick()
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