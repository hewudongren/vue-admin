
import i18nService from 'jw_services/i18n/index'

export default function (key) {
  let { lang } = i18nService.getLanguageMap()
  let all = {
    name: {
      formList: [{
        type: "text",
        label: lang['platform.user_setting.name'],
        key: "name"
      }],

      rules: {
        name: [{
          required: true,
          message: "请输入名称",
          trigger: "blur"
        }, {
          min: 2,
          max: 20,
          message: "长度在 2 到 20 个字符",
          trigger: "blur"
        }]
      }
    },

    password: {
      formList: [{
          type: "password",
          label: lang['platform.user_setting.oldPassword'],
          key: "passwordOld"
        },
        {
          type: "password",
          label: lang['platform.user_setting.newPassword'],
          key: "password"
        },
        {
          type: "password",
          label: lang['platform.user_setting.confirmPassword'],
          key: "checkPass"
        }
      ],

      rules: {

        passwordOld: [{
            required: true,
            message: "请输入旧密码",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    },

    mobile: {
      formList: [{
        type: "text",
        label: lang['platform.app_user.mobile'],
        key: "mobile"
      }],

      rules: {
        mobile: [{
            required: true,
            message: "请输入手机",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    },

    email: {
      formList: [{
        type: "text",
        label: lang['platform.app_user.email'],
        key: "email"
      }],

      rules: {
        email: [{
          type: "email",
          required: true,
          message: "请输入邮箱",
          trigger: "blur"
        }]
      }
    }
  }

  return all[key]
}