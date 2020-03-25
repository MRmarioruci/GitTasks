<!DOCTYPE html>
<html lang="en">

<head>
	<!-- Required meta tags -->
	<meta charset='utf-8'>
	<meta http-equiv='X-UA-Compatible' content='IE=edge'>
	<title>DevAdmin</title>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<link href="https://fonts.googleapis.com/css2?family=Bellota:wght@700&display=swap" rel="stylesheet">
	<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
	<link rel='stylesheet' type='text/css' media='screen' href='assets/css/login.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='assets/css/main.css'>
    
	<script type="text/javascript" src="/_common_/require.js" data-main="assets/js/main"></script>
	<script type="text/javascript">
		window.requireViewModel = function(module, parent) {
			return function(callback) {
				require([module], function(mod) {
					if (!parent[module]) {
						parent[module] = new mod();
					}
					if (parent[module].init_page) parent[module].init_page();
					callback(parent[module]);
				});
			};
		};
	</script>
</head>

<body>
    <div class="page-container">
        <?php include 'pages/sidebar.html'; ?>
    </div>
    
    <div class="page-content">
        
    </div>
</body>

<body>
    
	<div class="container-scroller">
		<?php include 'parts/_navbar.html'; ?>
		<div class="container-fluid page-body-wrapper">
			<div class="main-panel">
				<div data-bind="page: { id: 'Dashboard', params: [], title: 'Dashboard', withOnShow:  requireViewModel('dashboardViewModel',$root),sourceOnShow:'pages/dashboard_view.html' }" id="dashboard_page">
					<div class="text-center"><br>Loading...</div>
				</div>
			</div>
		</div>
	</div>
</body>

</html>