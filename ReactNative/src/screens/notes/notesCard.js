import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Button, Icon} from 'native-base';

export default class NotesCard extends Component {
  render() {
    return (
      <View style={styles.wrapperView}>
        <Card style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>{this.props.note.date}</Text>
            <View style={styles.cardHeaderButtonRow}>
              <Button
                style={{marginRight:-5}}
                transparent onPress={() => this.props.onEditNoteClick(this.props.note.id)}
              >
                <Icon name='md-create' style={{color: "#222"}}/>
              </Button>
              <Button
                style={{paddingRight:5}}
                transparent onPress={() => this.props.onDeleteNoteClick(this.props.note.id)}
              >
                <Icon name='md-trash' style={{color: "#222"}}/>
              </Button>
            </View>
          </View>
          <View style={styles.divider}/>
          <View style={styles.cardContent}>
            <Text style={styles.cardContentText}>
              {this.props.note.text}
            </Text>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperView: {
    marginLeft: 7,
    marginRight: 7,
  },
  card: {
    marginBottom: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardHeaderButtonRow: {
    flexDirection: "row"
  },
  cardHeaderButton: {
    padding:0
  },
  cardHeaderText: {
    paddingLeft: 15,
    fontSize: 16,
    color: "#222"
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc'
  },
  cardContent: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContentText: {
    color: '#222',
    fontSize: 15,
    lineHeight: 22
  }
});