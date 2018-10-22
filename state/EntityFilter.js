const EntityFilter = {};

EntityFilter.create = ({ columnKey, values = [] }) => Immutable({ columnKey, values });

Object.freeze(EntityFilter);

export default EntityFilter;
