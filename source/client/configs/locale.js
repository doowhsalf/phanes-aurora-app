//locale
import i18n from 'meteor/universe:i18n';
import t from 'tcomb-form'
import i18nSwedishForTComb from '/i18n/tcomb/sv';
import i18nEnglishForTComb from '/i18n/tcomb/en';

import Log from '/lib/log.js';
// Adding listener on change language
export default function () {
  return {

    getBrowserLang: function () {
      if (navigator.languages != undefined) {
        return navigator.languages[0];
      } else {
        return navigator.language || navigator.browserLanguage;
      }
    },


    getDefaultLocale: function () {
      const locale = Meteor.settings['public'].defaultLocale;
      if (locale && locale.length > 0) {
        return locale;
      } else {
        return this.getBrowserLang();
      }
    },

    getAndSetLocale: function (context) {
      const {Meteor} = context;
      if (Meteor.userId()) {
        Meteor.call('_users.getLanguagePreference', Meteor.userId(), (error, language) => {
          if (error != undefined) {
            console.log(error);
            Log.info(error);
          }
          if (language) {
            //console.log(`Setting locale to ${language}`);
            i18n.setLocale(language, {noDownload: false, fresh: true})
            // .then(response => console.log(`Set locale done with ${response}`))
              .catch(error => {
                Log.info('Error in setLocale promise');
                Log.info(error)
              });
            return;
          }
          i18n.setLocale(this.getDefaultLocale());
        });
      } else {
        i18n.setLocale(this.getDefaultLocale());
      }
    },

    saveLocale: function (context, newLocale) {
      const {Meteor} = context;
      if (Meteor.userId()) {
        //console.log(`Saving locale: ${newLocale}`);
        Meteor.call('_users.setLanguagePreference', Meteor.userId(), newLocale);
      }
    },

    init: function (context) {
      const that = this;
      i18n.onChangeLocale(function (newLocale) {
        if (Meteor.userId()) {
          that.saveLocale(context, newLocale);
        }
      });
      //NOTE: we may need to set url in some cases - otherwise translation wont work
      //i18n.setOptions({hostUrl:"http://10.29.7.10:3000"})
      this.getAndSetLocale(context);
    }
  };
}


