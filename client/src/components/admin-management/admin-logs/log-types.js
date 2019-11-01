export default [
  {
    type: 'start_server',
    name: 'Start Server',
    toString: () => `Started the server.`
  },
  {
    type: 'stop_server',
    name: 'Stop Server',
    toString: () => `Stopped the server.`
  },
  {
    type: 'restart_server',
    name: 'Restart Server',
    toString: () => `Restarted the server.`
  },
  {
    type: 'add_admin_permission',
    name: 'Add Admin',
    toString: adminLog => `Added ${adminLog.targetAdmin.displayName} as an admin.`
  },
  {
    type: 'update_admin_permission',
    name: 'Edit Admin Permissions',
    toString: adminLog => `Edited ${adminLog.targetAdmin.displayName}'s admin permissions.`
  },
  {
    type: 'remove_admin_permission',
    name: 'Remove Admin',
    toString: adminLog => `Removed ${adminLog.targetAdmin.displayName} from being an admin.`
  },
  {
    type: 'add_ban',
    name: 'Add Ban',
    toString: adminLog => `${adminLog.ipBanned ? 'IP' : ''} Banned ${adminLog.targetPlayer.guid} ${adminLog.length === -1 ? 'permanently' : `for ${adminLog.length} ${adminLog.length > 1 ? 'days' : 'day'}`} with reason: ${adminLog.reason}`
  },
  {
    type: 'un_ban',
    name: 'Unban',
    toString: adminLog => `Unbanned ${adminLog.targetPlayer.guid} with reason: ${adminLog.reason}`
  },
  {
    type: 'delete_ban',
    name: 'Delete Ban',
    toString: adminLog => `Deleted ban from ${adminLog.targetPlayer.guid}'s history with reason: ${adminLog.reason}`
  },
  {
    type: 'add_warning',
    name: 'Add Warning',
    toString: adminLog => `Warned ${adminLog.targetPlayer.guid} with reason: ${adminLog.reason}`
  },
  {
    type: 'delete_warning',
    name: 'Delete Warning',
    toString: adminLog => `Deleted warning from ${adminLog.targetPlayer.guid}'s history with reason: ${adminLog.reason}`
  },
  {
    type: 'add_note',
    name: 'Add Note',
    toString: adminLog => `Added note to ${adminLog.targetPlayer.guid} with contents: ${adminLog.reason}`
  },
  {
    type: 'delete_note',
    name: 'Delete Note',
    toString: adminLog => `Deleted note from ${adminLog.targetPlayer.guid} with reason: ${adminLog.reason}`
  },
  {
    type: 'adjust_gold',
    name: 'Adjust Gold',
    toString: adminLog => {
      switch (adminLog.adjustmentType) {
        case 'add':
          return `Added ${adminLog.amount} gold ${adminLog.remove ? 'from' : 'to'} ${adminLog.targetPlayer.guid}'s ${adminLog.from === 'bankGold' ? 'bank' : 'pouch'} with reason: ${adminLog.reason}`;
        case 'remove':
          return `Removed ${adminLog.amount} gold ${adminLog.remove ? 'from' : 'to'} ${adminLog.targetPlayer.guid}'s ${adminLog.from === 'bankGold' ? 'bank' : 'pouch'} with reason: ${adminLog.reason}`;
        case 'transfer':
          return `Transferred ${adminLog.amount} gold from ${adminLog.targetPlayer.guid} to ${adminLog.recipientPlayer.guid} with reason: ${adminLog.reason}`;
        default:
          return 'Something went wrong here.';
      }
    }
  },
  {
    type: 'strip_player',
    name: 'Strip Player',
    toString: adminLog => `Stripped Player ${adminLog.targetPlayer.guid} with reason: ${adminLog.reason}`
  },
  {
    type: 'wipe_player_name',
    name: 'Wipe Player Name',
    toString: adminLog => `Wiped Player Name: ${adminLog.name}`
  }
];