// 追加 selected 属性
// <td class="{cycle advance=false} sub_module_name">
	// {$tableList[ix].sub_module_name}
	// <input class="sub_module_id" type="hidden" name="sub_module_id" value="{$tableList[ix].sub_module_id}">
// </td>
	// append selected attribute for main module
	// $('#int_main_module_id_'+int_table_id+' option[value="'+main_module_id+'"]').prop("selected","selected");
	// append selected attribute for sub module
	var sub_module_id = $.trim(obj.parent().siblings('.sub_module_name').find('.sub_module_id').val());
	subModuleId = sub_module_id.split(',');
	$(subModuleId).each(function(index, el){
		$('#int_sub_module_id_'+int_table_id+' option[value="'+el+'"]').prop("selected","selected");
	})
	// subModuleId.forEach(function(item, index){
	//     $('#int_sub_module_id_'+int_table_id+' option[value="'+item+'"]').prop("selected","selected");
	// });

	// $.map(subModuleId,function(value,index){
	//     console.log(value)
	//     $('#int_sub_module_id_'+int_table_id+' option[value="'+value+'"]').prop("selected","selected");
	// });