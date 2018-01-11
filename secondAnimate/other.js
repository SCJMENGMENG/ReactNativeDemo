/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Animated,
    LayoutAnimation,
    PanResponder,
    Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default class App extends Component<{}> {

    constructor(props){
        super(props);
        this.state={

            // 旋转用
            bounceValue: new Animated.Value(0),
            rotateValue: new Animated.Value(0),


            loadingVY: new Animated.Value(0),
            loadingVX: new Animated.Value(0),
            widthVX:new Animated.Value(height * 0.2),
            heightVY:new Animated.Value(height * 0.2),
        }
    };

    componentDidMount() {
        //在初始化渲染执行之后立刻调用动画执行函数
        this.startAnimation();
    }

    // 动画
    startAnimation(){
        // 重复
        this.state.bounceValue.setValue(0);
        this.state.rotateValue.setValue(0);
        this.state.loadingVY.setValue(0);
        this.state.loadingVX.setValue(0);
        this.state.widthVX.setValue(height * 0.2);
        this.state.heightVY.setValue(height * 0.2);
        var timing = Animated.timing;
        Animated.parallel([
            timing(this.state.loadingVY, {
                toValue: -height * 0.12,//目标值
                duration: 2000,//动画值
            }),
            // timing(this.state.loadingVX, {
            //     toValue: -height * 0.3,//目标值
            //     duration: 2000,//动画值
            // }),
            timing(this.state.widthVX,{
                toValue:height * 0.4,
                duration:2000,
            }),
            timing(this.state.heightVY,{
                toValue:height * 0.4,
                duration:2000,
            })
        ]).start(() => this.startAnimation());
    }


    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={{
                        backgroundColor:'red',
                        width: this.state.widthVX,
                        height: this.state.heightVY,
                        transform: [

                            // 位置坐标改变
                            {translateY: this.state.loadingVY},
                            {translateX: this.state.loadingVX},

                            // 旋转
                            // {
                            //     rotate: this.state.rotateValue.interpolate({
                            //         inputRange: [0, 1],
                            //         outputRange: ['0deg', '360deg'],
                            //     })
                            // }
                        ]
                    }}
                >
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
