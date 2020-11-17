// import Vue from 'vue'
// import VeeValidate from 'vee-validate'
// import zh_CN from 'vee-validate/dist/locale/zh_CN.json'

import Vue from 'vue';
import { ValidationProvider, extend,ValidationObserver} from 'vee-validate';
import { required ,email} from 'vee-validate/dist/rules'
// Add a rule.
extend('phoneNum', {
  validate: phoneNum =>  /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phoneNum) ,
  message: '请输入正确的手机号'
});
extend('requiredCode1', {
  ...required,
  validate: value => {
    return value.length==6;
  },
  message: '请输入正确的验证码'
});
extend('requiredCode2', {
  ...required,
  validate: value => {
    return value.length==4;
  },
  message: '请输入正确的验证码'
});
extend('phoneNumRequired', {
  ...required,
  message: '请输入手机号'
});
extend('email', {
  ...email,
  message: '请输入正确的邮箱'
});
extend('content', {
  ...required,
  message: '请输入内容'
});
extend('password', {
  ...required,
  message: '请输入密码'
});
extend('content2', {
  ...required,
  message: '请输入手机号/邮箱/用户名'
});
// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);