const GroupSelector = ({ grupos, handleGroupChange }) => {
    return (
        <select className='grupo' onChange={handleGroupChange}>
            <option value="">Selecione um grupo</option>
            {grupos.map(grupo => (
                <option key={grupo} value={grupo}>
                    {grupo}
                </option>
            ))}
        </select>
    );
};

export default GroupSelector


