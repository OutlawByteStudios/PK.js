import { gql } from 'apollo-server-koa';

export default gql`
  type IPRecord @fieldViewPermission(requiresAdminPermission: "viewIPRecords") {
    _id: String

    ip: String @fieldViewPermission(requiresAdminPermission: "viewIPs")
    ipMask: Int

    server: Server
    player: Player

    lastSeen: Date
  }
`;
