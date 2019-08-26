import { defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'apollo-server-koa';
import { AdminPermission } from '../../models';

const getServerIDField = objectType => {
  switch (objectType.toString()) {
    case 'Server':
      return 'id';
    default:
      return 'server';
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
    const serverIDField = getServerIDField(objectType);
    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      const requires =
        field.requiresAdminPermission || objectType.requiresAdminPermission;

      field.resolve = async function(parent, args, context, info) {
        if (!requires)
          return resolve.apply(this, [parent, args, context, info]);

        const adminPermission = await AdminPermission.findOne({
          server: parent[serverIDField],
          admin: context.user,
          [requires]: { $gt: 0 }
        });

        if (adminPermission !== null)
          return resolve.apply(this, [parent, args, context, info]);
        else return null;
      };
    });
  }
}

export default FieldViewPermission;
