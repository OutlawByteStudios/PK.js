import items from '../../../../data/itemIDs.json';

export default {
  Query: {
    item: (parent, filter) => {
      return items[filter.id];
    },
    items: () => {
      return Object.values(items);
    }
  },

  Player: {
    headArmour: parent => items[parent.headArmour],
    bodyArmour: parent => items[parent.bodyArmour],
    footArmour: parent => items[parent.footArmour],
    handArmour: parent => items[parent.handArmour],
    firstItem: parent => items[parent.firstItem],
    secondItem: parent => items[parent.secondItem],
    thirdItem: parent => items[parent.thirdItem],
    forthItem: parent => items[parent.forthItem],
    horse: parent => items[parent.horse]
  }
};
