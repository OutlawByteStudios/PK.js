import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'apollo-server-koa';

const getServerIDField = objectType => {
  switch (objectType.toString()) {
    case 'Server':
      return 'id';
    default:
      return 'server';
  }
};

const getPlayerIDField = objectType => {
  switch (objectType.toString()) {
    case 'Player':
      return 'guid';
    default:
      return 'player';
  }
};

class FieldViewPermission extends SchemaDirectiveVisitor {
  visitObject(type) {
    type.requiresAdminPermission = this.args.requiresAdminPermission;
    type.viewIfPlayer = this.args.viewIfPlayer;
    this.ensureFieldsWrapped(type);
  }

  visitFieldDefinition(field, details) {
    field.requiresAdminPermission = this.args.requiresAdminPermission;
    field.viewIfPlayer = this.args.viewIfPlayer;
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(objectType) {
    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      const requires =
        field.requiresAdminPermission || objectType.requiresAdminPermission;
      const viewIfPlayer = field.viewIfPlayer || objectType.viewIfPlayer;

      field.resolve = async function(parent, args, context, info) {
        // if no permission is required resolve immediately
        if (!requires)
          return resolve.apply(this, [parent, args, context, info]);

        const server = parent[getServerIDField(objectType)];

        // if player can access their own data then check if they one the player
        // which is assigned to this object
        if (viewIfPlayer) {
          const guid = parent[getPlayerIDField(objectType)];
          if (context.players[`${server}-${guid}`])
            return resolve.apply(this, [parent, args, context, info]);
        }

        // if they are not the player check if they have permission to access
        // the data via an admin permission
        if (
          context.adminPermissions[server] &&
          context.adminPermissions[server][requires]
        )
          return resolve.apply(this, [parent, args, context, info]);

        return null;
      };
    });
  }
}

export default FieldViewPermission;
