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


            // ------------------------------------华丽的分割线-------------------------------------
            // 拖拽
            trans:new Animated.ValueXY(),

            widthB: height * 0.2,
            heightB:height *0.2,

        }

        this.onStartShouldSetPanResponder=this.onStartShouldSetPanResponder.bind(this);
        this.onMoveShouldSetPanResponder=this.onMoveShouldSetPanResponder.bind(this);
        this.onPanResponderMove=this.onPanResponderMove.bind(this);
        this.onPanResponderEnd=this.onPanResponderEnd.bind(this);
    };

    componentDidMount() {
        //在初始化渲染执行之后立刻调用动画执行函数
        // this.startAnimation();
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

    //用户开始触摸屏幕的时候，是否愿意成为响应者；
    onStartShouldSetPanResponder(evt, gestureState){
        return true;
    }
    //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
    onMoveShouldSetPanResponder(evt, gestureState){
        return true ;
    }

    // 最近一次的移动距离为gestureState.move{X,Y}
    onPanResponderMove(evt, gestureState){

        //实时更新
        this.state.trans.setValue({x:gestureState.dx,y:gestureState.dy})

        let dx ;

        if (gestureState.dx >50){
          dx = 50;
        }else if (gestureState.dx < -50){
          dx = -50;
        }else {
          dx = gestureState.dx
        }

        this.setState({
            widthB:height *0.2 + height *0.2 * (dx <0 ? dx * -1 : dx) /50,
            heightB:height *0.2 + height *0.2 * (dx <0 ? dx * -1 : dx) /50,
        })


        // 放大动画（动态改变底部view的大小）


    }
    // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
    // 一般来说这意味着一个手势操作已经成功完成。
    onPanResponderEnd(e,{vx,vy}){


        this.state.trans.flattenOffset();// ?

        var xxx;

        if (vx >= 0){
            xxx = this.clamp(vx,3,5);
        }else if(vx <0){
            xxx = this.clamp(vx *-1,3,5) *-1;
        }

        var aa ,bb;

        if (xxx <0){
            aa = -2;
        }else {
            aa = 2;
        }

        if (vy <0){
            bb = -2;
        }else {
            bb = 2;
        }

        this.qaqa(xxx,vy,aa,bb)

    }

    qaqa = ( xxx,vy,aa,bb) =>{
        if (Math.abs(this.state.trans.x._value) >100 ){
            Animated.decay(this.state.trans, {//以一个初始速度开始并且逐渐减慢停止
                velocity: {x: xxx +aa , y: vy +bb }, // 起始速度，必填参数。
                deceleration: 0.99 // 速度衰减比例，默认为0.997。
            }).start(this.resetSate.bind(this))//显示下一张图片信息及效果
        }else {

            this.setState({
                widthB:height *0.2 ,
                heightB:height *0.2,
            })
            Animated.spring(this.state.trans, {//弹动回到原位
                toValue: {x: 0, y: 0},
                friction: 4
            }).start()
        }
    }

    clamp(value, min, max) {
        return min < max
            ? (value < min ? min : value > max ? max : value)
            : (value < max ? max : value > min ? min : value)
    }

    resetSate(){
        this.state.trans.setValue({x:0,y:0})

        this.setState({
            widthB:height *0.2 ,
            heightB:height *0.2,
        })
    }

    componentWillMount(evt, gestureState){
        this._panResponder=PanResponder.create({
            onStartShouldSetPanResponder:this.onStartShouldSetPanResponder,
            onMoveShouldSetPanResponder:this.onMoveShouldSetPanResponder,
            onPanResponderMove:this.onPanResponderMove,
            onPanResponderRelease:this.onPanResponderEnd,
            onPanResponderTerminate:this.onPanResponderEnd,
        });

    }


    render() {

        let color ;


        if (this.state.trans.x._value >20 ){
            color = 'yellow'
        }else if (this.state.trans.x._value <-20){
            color = 'green'
        }else {
            color = 'pink'
        }

        return (
            <View style={styles.container}>
                {/*<Animated.View*/}
                {/*style={{*/}
                {/*backgroundColor:'blue',*/}
                {/*width: this.state.widthVX,*/}
                {/*height: this.state.heightVY,*/}
                {/*transform: [*/}

                {/*// 位置坐标改变*/}
                {/*{translateY: this.state.loadingVY},*/}
                {/*{translateX: this.state.loadingVX},*/}

                {/*// 旋转*/}
                {/*// {*/}
                {/*//     rotate: this.state.rotateValue.interpolate({*/}
                {/*//         inputRange: [0, 1],*/}
                {/*//         outputRange: ['0deg', '360deg'],*/}
                {/*//     })*/}
                {/*// }*/}
                {/*]*/}
                {/*}}*/}
                {/*>*/}
                {/*</Animated.View>*/}
              <View style={{
                  backgroundColor:'blue',
                  width: this.state.widthB,
                  height: this.state.heightB,
              }}/>
              <Animated.View style={{width:height * 0.4,
                  height:height * 0.4,
                  backgroundColor:color,
                  position:'absolute',
                  top: 110,
                  transform:[
                      {translateY:this.state.trans.y},
                      {translateX:this.state.trans.x},
                  ],
              }}
                             {...this._panResponder.panHandlers}
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
