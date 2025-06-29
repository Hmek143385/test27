const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const WorkflowLog = sequelize.define('WorkflowLog', {
  workflow_id: DataTypes.UUID,
  contact_id: DataTypes.UUID,
  triggered_at: DataTypes.DATE,
  status: DataTypes.STRING,
  execution_details: DataTypes.TEXT
});

module.exports = WorkflowLog;