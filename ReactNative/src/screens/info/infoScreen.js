import React, {Component} from 'react';
import {Text} from 'react-native';
import {Container, Content, Card, CardItem} from 'native-base';

export default class InfoScreen extends Component {
  static navigationOptions = (props) => ({
    title: 'Informationen',
    drawerLockMode: 'locked-closed',
  })

  render() {
    return (
      <Container>
        <Content style={{padding: 5, paddingTop: 3}}>
          <Card>
            <CardItem>
              <Text style={{color: '#000'}}>
                Die App wurde für die Masterarbeit von Maximilian Ehbauer erstellt.
                Die App hilft dabei verschiedene Entwicklungsmethoden zur Erstellung mobiler Apps zu bewerten.
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Text style={{color: '#000'}}>
                Version 1.0, Juni 2018
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}