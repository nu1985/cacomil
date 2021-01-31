import React, {Component} from 'react';
import {Text} from 'react-native';
import { Content, Card, CardItem, Body, Left} from 'native-base';
export default class AppBodyData extends Component {

    render() {
        let articles = this.props.data.map(function (articleData, index) {
                return (
                  <Card>
                    <CardItem>
                        <Body>
                            <Text>
                                {articleData.title.$t}
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                )
            });

        return (
            <Content>
                {articles}
            </Content>

        );

    }
}
module.export = AppBodyData;