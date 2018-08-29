//抽采效果预测
			var chart_1 = echarts.init(document.getElementById("chart_1"),'dark');
			var chart_2 = echarts.init(document.getElementById("chart_2"),'dark');
			var chart_4 = echarts.init(document.getElementById("chart_4"),'dark');
			var chart_3 = echarts.init(document.getElementById("chart_3"),'dark');
			var option_1 = {
				//设置全局背景色
				backgroundColor: 'rgba(0,0,0,0.1)',
				
				//定义一个标题
				title:{
					text:"瓦斯浓度图"
				},
				legend:{
					data:['瓦斯浓度真实值','瓦斯浓度预测值']
				},
				xAxis:{
					data:[]
				},
				yAxis:{
					 axisLabel:{show:true},//y轴文字
			        axisLine: {show: true},//y轴线是否显示
			    },
			    tooltip : {//鼠标移入折点显示悬浮框
			       show:true,
					formatter:'系列名：{a}<br />时间：{b}<br />数值：{c}'
				},
				//name=legend.data才能显示图例
				series:[{
					name:"瓦斯浓度真实值",
					type:'line',
					data:[],
					areaStyle: {normal: {//设置线下面部分颜色渐变
			            color: new echarts.graphic.LinearGradient(
			                0, 0, 0, 1,
			                [
			                    {offset: 0, color: '#3e4abb'},
			                    {offset: 0.5, color: '#222f77'},
			                    {offset: 1, color: '#182250'}
			                ]
			            )
			        }},
			        
			        symbol: 'emptyCircle',     //设定为空心点
			        
			        itemStyle:{
			            normal:{
			                color:'yellow',//折点颜色
			                lineStyle:{
			                    color:'yellow',//折线颜色
			                    width:'2'
			                }
			            }
			        }
				},{
					name:"瓦斯浓度预测值",
					type:'line',
					data:[],
					areaStyle: {normal: {//设置线下面部分颜色渐变
			            color: new echarts.graphic.LinearGradient(
			                0, 0, 0, 1,
			                [
			                    {offset: 0, color: '#3e4abb'},
			                    {offset: 0.5, color: '#222f77'},
			                    {offset: 1, color: '#182250'}
			                ]
			            )
			        }},
			        
			        symbol: 'emptyCircle',     //设定为空心点
			        
			        itemStyle:{
			            normal:{
			                color:'#595de4',//折点颜色
			                lineStyle:{
			                    color:'#595de4',//折线颜色
			                    width:'2'
			                }
			            }
			        }
				}]
			};
			chart_1.setOption(option_1);
			
			//chart1.showLoading();

			$("#w-yuce").click(function(){
				//获取分站类型
				//alert($(".shishishuju .fz").val());
                var times_1=[];    //时间数组（实际用来盛放X轴坐标值）
                var nums_1=[];    //数据数组（实际用来盛放Y坐标值）
                var _nums_1=[];
				$.ajax({
						type:"get",
						url:url+"/readdata/getnowdata/?callback=?",
						data:{
							"no":"1_1_1_1",
							"type":'1_2_3_4',
							"id":'1_1_1_1',
							
						},
						dataType:"jsonp",
						jsonpCallback:"callback",
						success:function(res){
							//拿到数据进行展示
							for(var i=0;i<res.S1_1_1.length;i++){
								var str = res.S1_1_1[i].date;
								str1 = str.substring(0,10);
								var arr = str1.split("_");
								str1 = arr.join("/");
								str2 = str.substring(11);
								var arr1 = str2.split("_");
								str2 = arr1.join(":");
								times_1.push(str1+" "+str2);
							}
							for(var i=0;i<res.S1_1_1.length;i++){
								nums_1.push(res.S1_1_1[i].values.toFixed(3));
							}
							for(var i=0;i<res.pre_nowS1_1_1.length;i++){
								_nums_1.push(res.pre_nowS1_1_1[i].values.toFixed(3));
							}
							chart_1.setOption({//加载数据图表
								xAxis:{
									data: times_1
								},
								series:[{
									name:"瓦斯浓度真实值",
									data:nums_1,
									 markLine: {
					                    data: [{
					                        type: 'average',
					                        name: '平均值'
					                    }]
					                }
								},{
									name:"瓦斯浓度预测值",
									data:_nums_1
								}]
							})
						},
						error:function(errorMsg){
							//alert("图表数据请求失败");
							//chart1.hideLoading();
						}
				});
			})