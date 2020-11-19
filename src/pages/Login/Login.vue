<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{ on: isShowMes }" @click="changeLogin"
            >{{ $t('messageLogin')}}</a
          >
          <a
            href="javascript:;"
            :class="{ on: !isShowMes }"
            @click="changeLogin"
            >{{ $t('passwordLogin')}}</a
          >
        </div>
      </div>

      <div class="login_content">
        <form @submit.prevent="onSubmit">
          <div :class="{ on: isShowMes }">
            <ValidationObserver ref="form1">
              <section class="login_message">
                <ValidationProvider
                  mode="eager"
                  rules="phoneNum|phoneNumRequired"
                  v-slot="{ errors }"
                >
                  <input
                    type="tel"
                    maxlength="11"
                    :placeholder=" $t('phoneNum')"
                    v-model="phoneNum"
                  />
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <button
                  :disabled="disabled"
                  class="get_verification"
                  :class="{ right_phone_number: !disabled }"
                  @click.prevent="senCode"
                >
                  {{isSend ? `验证码已发送（${time}）s`:'发送验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <ValidationProvider
                  mode="eager"
                  rules="requiredCode1"
                  v-slot="{ errors }"
                >
                  <input
                    type="tel"
                    maxlength="8"
                    :placeholder=" $t('validationCode')"
                    v-model="Vee_code1"
                  />
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </section>
            </ValidationObserver>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !isShowMes }">
            <ValidationObserver ref="form2">
              <section>
                <section class="login_message">
                  <ValidationProvider
                    mode="eager"
                    rules="content2"
                    v-slot="{ errors }"
                  >
                    <input
                      type="tel"
                      maxlength="11"
                      :placeholder="$t('username')"
                      v-model="phoneNum_email_username"
                    />
                    <span>{{ errors[0] }}</span>
                    <span>{{ errors[1] }}</span>
                  </ValidationProvider>
                </section>
                <section class="login_verification">
                  <ValidationProvider
                    mode="eager"
                    rules="password"
                    v-slot="{ errors }"
                  >
                    <input
                      :type="isShowPwd ? 'text' : 'password'"
                      maxlength="8"
                      :placeholder="$t('password')"
                      v-model="password"
                    />
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                  <div
                    class="switch_button"
                    :class="isShowPwd ? 'on' : 'off'"
                    @click="isShowPwd = !isShowPwd"
                  >
                    <div
                      class="switch_circle"
                      :class="{ right: isShowPwd }"
                    ></div>
                    <span class="switch_text">{{
                      isShowPwd ? "abc" : ""
                    }}</span>
                  </div>
                </section>
                <section class="login_message">
                  <ValidationProvider
                    mode="eager"
                    rules="requiredCode2"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      maxlength="11"
                      :placeholder="$t('validationCode')"
                      v-model="Vee_code2"
                    />
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                  <img
                    class="get_verification"
                    src="http://localhost:4000/captcha"
                    alt="captcha"
                    @click="updateCaptcha"
                    ref="captcha"
                  />
                </section>
              </section>
            </ValidationObserver>
          </div>
          <button class="login_submit" type="submit">{{$t('login')}}</button>
        </form>

        <a href="javascript:;" class="about_us">{{$t('abort')}}</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <mt-button @click="swichLanguage" id="languageButton" :plain="true" style="border:0px"  size="small">{{$t('switchLanguage')}}</mt-button>
  </section>
</template>

<script type="text/ecmascript-6">
import {reqSendCode,reqLogin_sms,reqLogin_pwd} from '../../api'
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      isShowPwd: false,
      isShowMes: true,
      disabled: true,
      phoneNum: "",
      password: "",
      phoneNum_email_username: "",
      Vee_code1: "",//验证码短信
      Vee_code2: "",//验证码密码
      isSend:false,
      time:10, //倒计时,
      timeArr:[],
      
    };
  },

  methods: {
    changeLogin() {
      this.isShowMes = !this.isShowMes;
    },
     onSubmit() {
       
      if (this.isShowMes) {
        this.$refs.form1.validate().then(async (success) => {
          if (!success) {
            return;
          }
          
          const result = await reqLogin_sms(this.phoneNum,this.Vee_code1)
          const {code,data,msg} = result
          if(code===0){
            this.$router.replace('/profile')
            this.$store.dispatch('saveUser',data)
            console.log(data)
            
            
          }else{
            Toast(msg)
          }
        });
      }else{
        this.$refs.form2.validate().then( async (success) => {
          if (!success) {
            return;
          }
          console.log(this.phoneNum_email_username)
          const result = await reqLogin_pwd(this.phoneNum_email_username,this.password,this.Vee_code2)
          const {code,data,msg} = result
          if(code===0){
            console.log(data)
            this.$router.replace('/profile')
            this.$store.dispatch('saveUser',data)
          }else{
            Toast(msg)
            this.$refs.captcha.src = "http://localhost:4000/captcha?time"+Date.now()
          }

         
        });

      }
    },
    async senCode(){
      if(!this.isSend){
        this.isSend=true
        this.disabled=true
        let val =  setInterval(()=>{
          this.time--
          if(this.time===0){
            this.isSend=false
            this.disabled=!/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phoneNum);
            clearInterval(val)
            this.time=10
          }
        },1000)
        const result = await reqSendCode(this.phoneNum)
        const {code,msg} = result
        if(code===0){
          console.log('验证码发送成功')
          Toast("验证码发送成功")
        }else{
           Toast(msg)
        }


      }

    },
    updateCaptcha(){
      let now = Date.now()
      console.log(now)
      this.timeArr.push(now)
      if(this.timeArr.length>=3){
        if(now-this.timeArr[0]>=3000){
           this.$refs.captcha.src = "http://localhost:4000/captcha?time"+now
           
             this.timeArr.splice(0,1)
           

        }else{
           Toast('请勿频繁获取验证码')
        } 
           
      }else{
        this.$refs.captcha.src = "http://localhost:4000/captcha?time"+now
      }
      
     
      
    },
    swichLanguage(){
      let a = this.$i18n.locale==='zh_CN'?'en':'zh_CN'
      this.$i18n.locale = a
      
    }
  },
  watch: {
    phoneNum(value) {
      this.disabled = !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(value);
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  
  width: 100%;
  height: 100%;
  background: #fff;
  #languageButton{
     display block
     margin 0 auto
    
    
  }

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }

            .right_phone_number {
              color: #444;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;

                &.right {
                  transform: translateX(26px);
                }
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>
