window.addEventListener('load', () => {
	window.status = 'load';
	const rootDiv = document.getElementById('root');
	const field = document.createElement('div');
	field.setAttribute('id', 'field');
	rootDiv.appendChild(field);
	field.innerHTML=`
<table role="grid">
	<tr>
	<td role="gridcell"></td>
	<td role="gridcell"></td>
	<td role="gridcell"></td>
	</tr><tr>
	<td role="gridcell"></td>
	<td role="gridcell"></td>
	<td role="gridcell"></td>
	</tr><tr>
	<td role="gridcell"></td>
	<td role="gridcell"></td>
	<td role="gridcell"></td>
	</tr>	
</table>
	`;
});
