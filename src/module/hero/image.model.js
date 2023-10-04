import { DataTypes } from 'sequelize';
import sequelize from '../../db/sequelize';

const HeroImage = sequelize.define('HeroImage', {
  imgId: {
    type: DataTypes.UUID,
    allowNull: true,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  imgName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

// HeroImage.sync({ alter: true }).then(() => console.log('同步成功')).catch(() => console.log('同步失败'));

export default HeroImage;
