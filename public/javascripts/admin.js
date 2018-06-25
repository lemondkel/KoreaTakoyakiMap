/*
 * Created by dkel on 2018-06-24.
 */
function createPlace() {
	var latitude = $('#latitude').val();
	var longitude = $('#longitude').val();
	var title = $('#title').val();
	var desc = $('#desc').val();

	$.ajax({
		url: '/createPlace',
		method: 'POST',
		data: {
			latitude: latitude,
			longitude: longitude,
			title: title,
			desc: desc
		},
		success: function (data) {
			console.log(data);
		}
	});
}