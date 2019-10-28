/* Used to lock banks during transactions */

class BankLock {
  lock(guid){
    this[guid] = true;
  }

  unlock(guid){
    delete this[guid];
  }

  isLocked(guid){
    return guid in this;
  }
}
export default new BankLock();
