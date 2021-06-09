import IconSmartId from './IconSmartId.vue';
import IconIdCard from './IconIdCard.vue';
import IconMobileId from './IconMobileId.vue';

const icons = {
  IconSmartId,
  IconIdCard,
  IconMobileId,
}

const iconNames = {};
Object.keys(icons).forEach(key => iconNames[key] = key);

export {iconNames};

export default icons;
