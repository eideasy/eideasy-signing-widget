import IconSmartId from './IconSmartId.vue';
import IconIdCard from './IconIdCard.vue';
import IconMobileId from './IconMobileId.vue';
import IconIdCardEE from './IconIdCardEE.vue';

const icons = {
  IconSmartId,
  IconIdCard,
  IconMobileId,
  IconIdCardEE,
}

const iconNames = {};
Object.keys(icons).forEach(key => iconNames[key] = key);

export {iconNames};

export default icons;
