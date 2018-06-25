/*
 * Created by Administrator on 2018-01-26.
 */
var Sequelize = require('sequelize');

module.exports = {
	info: {
		idx: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		latitude: {
			type: Sequelize.FLOAT
		},
		longitude: {
			type: Sequelize.FLOAT
		},
		title: {
			type: Sequelize.STRING,
			defaultValue: "제목이 정해지지 않은 장소입니다."
		},
		desc: {
			type: Sequelize.STRING,
			defaultValue: "내용이 정해지지 않은 장소입니다."
		},
		images: {
			type: Sequelize.STRING
		},
		isDel: {
			type: Sequelize.INTEGER,
			defaultValue: 0
		},
		createdAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		},
		updatedAt: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	}
};