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
    this.ensureFieldsWrapped(type);
    type._requiresAdminPermission = this.args.requiresAdminPermission;
    type.viewIfPlayer = this.args.viewIfPlayer;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiresAdminPermission = this.args.requiresAdminPermission;
    field.viewIfPlayer = this.args.viewIfPlayer;
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const serverIDField = getServerIDField(objectType);
    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      const requires = field._requiresAdminPermission || objectType._requiresAdminPermission;

      field.resolve = async function(parent, args, context, info) {
        if(!requires) return resolve.apply(this, [parent, args, context, info]);

        const adminPermission = await AdminPermission.findOne({
          server: parent[serverIDField],
          admin: context.user,
          requires: { $gt: 0 }
        });

        if (adminPermission !== null) return resolve.apply(this, [parent, args, context, info]);
        else return null;
      };
    });
  }
}

export default FieldViewPermission;
