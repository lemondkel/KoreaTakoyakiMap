/*
 * Created by dkel on 2018-06-24.
 */

var markers = [],
	infoWindows = [];

var infoWindow = new naver.maps.InfoWindow({
	anchorSkew: true
});

var map = new naver.maps.Map('map', {
	center: new naver.maps.LatLng(37.9317, 126.56924),
	zoom: 1
});

$(document).ready(function () {
	$.ajax({
		url: '/places',
		method: 'GET',
		success: function (data) {
			console.log(data);

			for (var key in data.data) {

				var position = new naver.maps.LatLng(data.data[key].latitude, data.data[key].longitude);
				var marker = new naver.maps.Marker({
					map: map,
					position: position,
					title: data.data[key].title,
					icon: {
						url: '/images/octopus2.png',
						size: new naver.maps.Size(40, 40),
						scaledSize: new naver.maps.Size(40, 40)
					},
					zIndex: 100
				});

				var infoWindow = new naver.maps.InfoWindow({
					content: '<div class="item" data-id="' + data.data[key].idx + '"><b>' + data.data[key].title + '</b>' +
					'<br/>' +
					'<i class="up" onclick="addUp(this)"></i>' +
					'<br/>' +
					data.data[key].desc +
					'<br/>' +
					'<span class="date">반영일: ' + data.data[key].updatedAt + '</span>' +
					'</div>'
				});

				markers.push(marker);
				infoWindows.push(infoWindow);
			}

			naver.maps.Event.addListener(map, 'idle', function () {
				updateMarkers(map, markers);
			});

			for (var i = 0, ii = markers.length; i < ii; i++) {
				naver.maps.Event.addListener(markers[i], 'click', getClickHandler(i));
			}
		}
	});

	$('#address').on('keydown', function (e) {
		var keyCode = e.which;

		if (keyCode === 13) { // Enter Key
			searchAddressToCoordinate($('#address').val());
		}
	});

	$('#submit').on('click', function (e) {
		e.preventDefault();

		searchAddressToCoordinate($('#address').val());
	});
});

// result by latlng coordinate
function searchAddressToCoordinate(address) {
	naver.maps.Service.geocode({
		address: address
	}, function (status, response) {
		if (status === naver.maps.Service.Status.ERROR) {
			return false;
		}

		var item = response.result.items[0],
			addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]',
			point = new naver.maps.Point(item.point.x, item.point.y);

		infoWindow.setContent([
			'<div style="padding:10px;min-width:200px;line-height:150%;">',
			'<h4 style="margin-top:5px;">검색 주소 : ' + response.result.userquery + '</h4><br />',
			addrType + ' ' + item.address + '<br />',
			'</div>'
		].join('\n'));


		map.setCenter(point);
		infoWindow.open(map, point);
	});
}

function updateMarkers(map, markers) {

	var mapBounds = map.getBounds();
	var marker, position;

	for (var i = 0; i < markers.length; i++) {

		marker = markers[i];
		position = marker.getPosition();

		if (mapBounds.hasLatLng(position)) {
			showMarker(map, marker);
		} else {
			hideMarker(map, marker);
		}
	}
}

function showMarker(map, marker) {

	if (marker.setMap()) return;
	marker.setMap(map);
}

function hideMarker(map, marker) {

	if (!marker.setMap()) return;
	marker.setMap(null);
}

// 해당 마커의 인덱스를 seq라는 클로저 변수로 저장하는 이벤트 핸들러를 반환합니다.
function getClickHandler(seq) {
	return function (e) {
		var marker = markers[seq],
			infoWindow = infoWindows[seq];

		if (infoWindow.getMap()) {
			infoWindow.close();
		} else {
			map.panTo(marker.position, 'easing');
			infoWindow.open(map, marker);
		}
	}
}