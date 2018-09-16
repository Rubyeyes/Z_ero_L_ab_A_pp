angular.module('MyApp')
	.controller('adminCtrl', ['$scope', '$state', 'AdminAuth', 'ArticleCategory', 'RecipeCategory', 'Article', 'Recipe', 'WebBanner','MiniProgramBanner','WebSubBanner', 'MiniProgramSubBanner',
		function($scope, $state, AdminAuth, ArticleCategory, RecipeCategory, Article, Recipe, WebBanner, MiniProgramBanner, WebSubBanner, MiniProgramSubBanner) {
		// article related variable
		$scope.articleCategories = ArticleCategory.articlecategories;
		$scope.articleCategoryFormOn = false;
		$scope.addingArticleCategoryId = -1;
		$scope.editingArticleCategoryId = -1;
		$scope.currentArticleCategoryId = -1
		$scope.editingArticleId = -1;
		$scope.newArticleCategory = {};
		$scope.newArticle = {};
		$scope.editingArticleCategory = {};
		$scope.editingArticle = {};
		$scope.selectedArticleCategory = null;

		// recipe related variable
		$scope.recipeCategories = RecipeCategory.recipecategories;
		$scope.recipeCategoryFormOn = false;
		$scope.addingRecipeCategoryId = -1;
		$scope.editingRecipeCategoryId = -1;
		$scope.currentRecipeCategoryId = -1
		$scope.editingRecipeId = -1;
		$scope.newRecipeCategory = {};
		$scope.newRecipe = {};
		$scope.editingRecipeCategory = {};
		$scope.editingRecipe = {};
		$scope.selectedRecipeCategory = null;

		// webBanner related variable
		$scope.webBanners = WebBanner.webbanners;
		$scope.webBannerFormOn = false;
		$scope.addingWebBannerId = -1;
		$scope.editingWebBannerId = -1;
		$scope.currentWebBannerId = -1;
		$scope.newWebBanner = {};
		$scope.editingWebBanner = {};
		$scope.selectedWebBanner = null;

		// miniProgramBanner related variable
		$scope.miniProgramBanners = MiniProgramBanner.miniprogrambanners;
		$scope.miniProgramBannerFormOn = false;
		$scope.addingMiniProgramBannerId = -1;
		$scope.editingMiniProgramBannerId = -1;
		$scope.currentMiniProgramBannerId = -1;
		$scope.newMiniProgramBanner = {};
		$scope.editingMiniProgramBanner = {};
		$scope.selectedMiniProgramBanner = null;

		// webSubBanner related variable
		$scope.webSubBanners = WebSubBanner.websubbanners;
		$scope.webSubBannerFormOn = false;
		$scope.addingWebSubBannerId = -1;
		$scope.editingWebSubBannerId = -1;
		$scope.currentWebSubBannerId = -1;
		$scope.newWebSubBanner = {};
		$scope.editingWebSubBanner = {};
		$scope.selectedWebSubBanner = null;

		// miniProgramSubBanner related variable
		$scope.miniProgramSubBanners = MiniProgramSubBanner.miniprogramsubbanners;
		$scope.miniProgramSubBannerFormOn = false;
		$scope.addingMiniProgramSubBannerId = -1;
		$scope.editingMiniProgramSubBannerId = -1;
		$scope.currentMiniProgramSubBannerId = -1;
		$scope.newMiniProgramSubBanner = {};
		$scope.editingMiniProgramSubBanner = {};
		$scope.selectedMiniProgramSubBanner = null;

		//*********** Article Category Related Function ************//

		//show adding category form
		$scope.showNewArticleCategoryForm = function() {
			if ($scope.articleCategoryFormOn) {
				$scope.articleCategoryFormOn = false;
			} else {
				$scope.articleCategoryFormOn = true;
			}
		}
		//add new category
		$scope.addNewArticleCategory = function() {
			if (!$scope.newArticleCategory.order) {
				$scope.newArticleCategory.order = $scope.articleCategories.length
			}
			if($scope.newArticleCategory.title && $scope.newArticleCategory) {
				ArticleCategory.create($scope.newArticleCategory).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated")
						$scope.articleCategoryFormOn = false;
						$scope.newArticleCategory = {};
					}
				});
			}
		};
		//cancel category form
		$scope.cancelNewArticleCategoryForm = function() {
			$scope.articleCategoryFormOn = false;
		};
		// remove current category
		$scope.removeArticleCategory = function(category) {
			if(category) {
				ArticleCategory.delete(category).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success deleted");
					}
				});
			}
		}
		//show edit category form
		$scope.showArticleCategoryEditForm = function(category) {
			$scope.editingArticleCategoryId = category._id;
			$scope.editingArticleCategory = category;
			$scope.editingArticleCategory.neworder = category.order;
		}
		//cancel editing category form
		$scope.hideArticleCategoryEditForm = function() {
			$scope.editingArticleCategoryId = -1;
			$scope.editingArticleCategory = {};
		}
		//update category
		$scope.updateArticleCategory = function (category) {
			var newCategory = $scope.editingArticleCategory;
			newCategory.order = $scope.editingArticleCategory.neworder
			if($scope.editingArticleCategory) {
				ArticleCategory.update(category, newCategory).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated");
						$scope.editingArticleCategoryId = -1;
					}
				});
			}
		}

		//*********** Article related function ************//
		//show new article form
		$scope.showNewArticleFrom = function(articleCategory) {
			if ($scope.addingArticleCategoryId == -1) {
				$scope.addingArticleCategoryId = articleCategory._id;
			} else if ($scope.addingArticleCategoryId == articleCategory._id) {
				$scope.addingArticleCategoryId = -1;
			} else {
				$scope.addingArticleCategoryId = articleCategory._id;
			}
		}
		//hide new article form
		$scope.hideArticleForm = function() {
			$scope.addingArticleCategoryId = -1;
		}
		//add new article
		$scope.addNewArticle = function(articleCategory) {
			if($scope.newArticle.order == null) {	
				if (articleCategory.articles) {
					$scope.newArticle.order = articleCategory.articles.length
				} else {
					$scope.newArticle.order = 0
				}
			}
			$scope.newArticle.category = [articleCategory._id]
			if($scope.newArticle.title && $scope.newArticle.articleUrl) {
				Article.create($scope.newArticle).then(function(data) {
					var arrayAritcleCategoryIndex = $scope.articleCategories.findIndex(function(element) {
					  return element._id === articleCategory._id
					});
					$scope.articleCategories[arrayAritcleCategoryIndex].articles.push(data);
					$scope.newArticle = {};
					console.log("success updated")
					$scope.addingArticleCategoryId = -1;
					$scope.newArticle = {};
				});
			}
		};
		//show editing article form
		$scope.showArticleEditForm = function(article, articleCategory) {
			$scope.editingArticleId = article._id;
			$scope.currentArticleCategoryId = articleCategory._id;
			$scope.editingArticle = article;
			$scope.editingArticle.neworder = article.order;
		}
		//cancel editing category form
		$scope.hideArticleEditForm = function(index) {
			$scope.editingArticleId = -1;
			$scope.currentArticleCategoryId = -1;
			$scope.editingArticle = {};
		}		
		//update article
		$scope.updateArticle = function (article, articleCategory) {
			var newArticle = article
			if ($scope.editingArticle.title) {newArticle.title = $scope.editingArticle.title}
			if ($scope.editingArticle.subtitle) {newArticle.subtitle = $scope.editingArticle.subtitle}
			if ($scope.editingArticle.articleUrl) {newArticle.articleUrl = $scope.editingArticle.articleUrl}
			if ($scope.editingArticle.thumbnailUrl) {newArticle.thumbnailUrl = $scope.editingArticle.thumbnailUrl}
			if ($scope.editingArticle.neworder != null) {newArticle.order = $scope.editingArticle.neworder}

			if(newArticle) {
				Article.update(article, newArticle).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						var arrayAritcleCategoryIndex = $scope.articleCategories.findIndex(function(element) {
						  return element._id === articleCategory._id
						});
						var arrayAritcleIndex = $scope.articleCategories[arrayAritcleCategoryIndex].articles.findIndex(function(element) {
						  return element._id === article._id
						});
						$scope.articleCategories[arrayAritcleCategoryIndex].articles[arrayAritcleIndex] = newArticle;
						$scope.editingArticle = {};
						console.log("success updated");
						$scope.editingArticleId = -1;
						$scope.currentArticleCategoryId = -1;
					}
				});
			}
		}
		// remove current article
		$scope.removeArticle = function(article, articleCategory) {
			if(article) {
				Article.delete(article).then(function(err) {
					console.log(err)
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						var arrayAritcleCategoryIndex = $scope.articleCategories.findIndex(function(element) {
						  return element._id === articleCategory._id
						});
						var arrayAritcleIndex = $scope.articleCategories[arrayAritcleCategoryIndex].articles.findIndex(function(element) {
						  return element._id === article._id
						});
						$scope.articleCategories[arrayAritcleCategoryIndex].articles.splice(arrayAritcleIndex, 1);
						console.log("success deleted");
					}
				});
			}
		}


		//*********** Recipe Category Related Function ************//

		//show adding category form
		$scope.showNewRecipeCategoryForm = function() {
			if ($scope.recipeCategoryFormOn) {
				$scope.recipeCategoryFormOn = false;
			} else {
				$scope.recipeCategoryFormOn = true;
			}
		}
		//add new category
		$scope.addNewRecipeCategory = function() {
			if (!$scope.newRecipeCategory.order) {
				$scope.newRecipeCategory.order = $scope.recipeCategories.length
			}
			if($scope.newRecipeCategory.title && $scope.newRecipeCategory) {
				RecipeCategory.create($scope.newRecipeCategory).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated")
						$scope.recipeCategoryFormOn = false;
						$scope.newRecipeCategory = {};
					}
				});
			}
		};
		//cancel category form
		$scope.cancelNewRecipeCategoryForm = function() {
			$scope.recipeCategoryFormOn = false;
		};
		//remove current category
		$scope.removeRecipeCategory = function(category) {
			if(category) {
				RecipeCategory.delete(category).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success deleted");
					}
				});
			}
		}
		//show edit category form
		$scope.showRecipeCategoryEditForm = function(category) {
			$scope.editingRecipeCategoryId = category._id;
			$scope.editingRecipeCategory = category;
			$scope.editingRecipeCategory.neworder = category.order;
		}
		//cancel editing category form
		$scope.hideRecipeCategoryEditForm = function() {
			$scope.editingRecipeCategoryId = -1;
			$scope.editingRecipeCategory = {};
		}
		//update category
		$scope.updateRecipeCategory = function (category) {
			var newCategory = $scope.editingRecipeCategory;
			newCategory.order = $scope.editingRecipeCategory.neworder
			if($scope.editingRecipeCategory) {
				RecipeCategory.update(category, newCategory).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated");
						$scope.editingRecipeCategoryId = -1;
					}
				});
			}
		}

		//*********** Recipe related function ************//
		//show new recipe form
		$scope.showNewRecipeFrom = function(recipeCategory) {
			if ($scope.addingRecipeCategoryId == -1) {
				$scope.addingRecipeCategoryId = recipeCategory._id;
			} else if ($scope.addingRecipeCategoryId == recipeCategory._id) {
				$scope.addingRecipeCategoryId = -1;
			} else {
				$scope.addingRecipeCategoryId = recipeCategory._id;
			}
		}
		//hide new recipe form
		$scope.hideRecipeForm = function() {
			$scope.addingRecipeCategoryId = -1;
		}
		//add new recipe
		$scope.addNewRecipe = function(recipeCategory) {
			if($scope.newRecipe.order == null) {	
				if (recipeCategory.recipes) {
					$scope.newRecipe.order = recipeCategory.recipes.length
				} else {
					$scope.newRecipe.order = 0
				}
			}
			$scope.newRecipe.category = [recipeCategory._id]
			if($scope.newRecipe.title && $scope.newRecipe.recipeUrl) {
				Recipe.create($scope.newRecipe).then(function(data) {
					var arrayAritcleCategoryIndex = $scope.recipeCategories.findIndex(function(element) {
					  return element._id === recipeCategory._id
					});
					$scope.recipeCategories[arrayAritcleCategoryIndex].recipes.push(data);
					$scope.newRecipe = {};
					console.log("success updated")
					$scope.addingRecipeCategoryId = -1;
					$scope.newRecipe = {};
				});
			}
		};
		//show editing recipe form
		$scope.showRecipeEditForm = function(recipe, recipeCategory) {
			$scope.editingRecipeId = recipe._id;
			$scope.currentRecipeCategoryId = recipeCategory._id;
			$scope.editingRecipe = recipe;
			$scope.editingRecipe.neworder = recipe.order;
		}
		//cancel editing category form
		$scope.hideRecipeEditForm = function(index) {
			$scope.editingRecipeId = -1;
			$scope.currentRecipeCategoryId = -1;
			$scope.editingRecipe = {};
		}		
		//update recipe
		$scope.updateRecipe = function (recipe, recipeCategory) {
			var newRecipe = recipe
			if ($scope.editingRecipe.title) {newRecipe.title = $scope.editingRecipe.title}
			if ($scope.editingRecipe.subtitle) {newRecipe.subtitle = $scope.editingRecipe.subtitle}
			if ($scope.editingRecipe.recipeUrl) {newRecipe.recipeUrl = $scope.editingRecipe.recipeUrl}
			if ($scope.editingRecipe.thumbnailUrl) {newRecipe.thumbnailUrl = $scope.editingRecipe.thumbnailUrl}
			if ($scope.editingRecipe.neworder != null) {newRecipe.order = $scope.editingRecipe.neworder}

			if(newRecipe) {
				Recipe.update(recipe, newRecipe).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						var arrayAritcleCategoryIndex = $scope.recipeCategories.findIndex(function(element) {
						  return element._id === recipeCategory._id
						});
						var arrayAritcleIndex = $scope.recipeCategories[arrayAritcleCategoryIndex].recipes.findIndex(function(element) {
						  return element._id === recipe._id
						});
						$scope.recipeCategories[arrayAritcleCategoryIndex].recipes[arrayAritcleIndex] = newRecipe;
						$scope.editingRecipe = {};
						console.log("success updated");
						$scope.editingRecipeId = -1;
						$scope.currentRecipeCategoryId = -1;
					}
				});
			}
		}
		// remove current recipe
		$scope.removeRecipe = function(recipe, recipeCategory) {
			if(recipe) {
				Recipe.delete(recipe).then(function(err) {
					console.log(err)
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						var arrayAritcleCategoryIndex = $scope.recipeCategories.findIndex(function(element) {
						  return element._id === recipeCategory._id
						});
						var arrayAritcleIndex = $scope.recipeCategories[arrayAritcleCategoryIndex].recipes.findIndex(function(element) {
						  return element._id === recipe._id
						});
						$scope.recipeCategories[arrayAritcleCategoryIndex].recipes.splice(arrayAritcleIndex, 1);
						console.log("success deleted");
					}
				});
			}
		}


		//*********** WebBanner related function ************//
		//show adding webBanner form
		$scope.showNewWebBannerForm = function() {
			if ($scope.webBannerFormOn) {
				$scope.webBannerFormOn = false;
			} else {
				$scope.webBannerFormOn = true;
			}
		}
		//add new webBanner
		$scope.addNewWebBanner = function() {
			if (!$scope.newWebBanner.order) {
				$scope.newWebBanner.order = $scope.webBanners.length
			}
			if($scope.newWebBanner.title && $scope.newWebBanner) {
				WebBanner.create($scope.newWebBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated")
						$scope.webBannerFormOn = false;
						$scope.newWebBanner = {};
					}
				});
			}
		};
		//cancel webBanner form
		$scope.cancelNewWebBannerForm = function() {
			$scope.webBannerFormOn = false;
		};
		//remove current webBanner
		$scope.removeWebBanner = function(webBanner) {
			if(webBanner) {
				WebBanner.delete(webBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success deleted");
					}
				});
			}
		}
		//show edit webBanner form
		$scope.showWebBannerEditForm = function(webBanner) {
			$scope.editingWebBannerId = webBanner._id;
			$scope.editingWebBanner = webBanner;
			$scope.editingWebBanner.neworder = webBanner.order;
		}
		//cancel editing webBanner form
		$scope.hideWebBannerEditForm = function() {
			$scope.editingWebBannerId = -1;
			$scope.editingWebBanner = {};
		}
		//update webBanner
		$scope.updateWebBanner = function (webBanner) {
			var newWebBanner = $scope.editingWebBanner;
			newWebBanner.order = $scope.editingWebBanner.neworder
			if($scope.editingWebBanner) {
				WebBanner.update(webBanner, newWebBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated");
						$scope.editingWebBannerId = -1;
					}
				});
			}
		}

		//*********** MiniProgramBanner related function ************//
		//show adding miniProgramBanner form
		$scope.showNewMiniProgramBannerForm = function() {
			if ($scope.miniProgramBannerFormOn) {
				$scope.miniProgramBannerFormOn = false;
			} else {
				$scope.miniProgramBannerFormOn = true;
			}
		}
		//add new miniProgramBanner
		$scope.addNewMiniProgramBanner = function() {
			if (!$scope.newMiniProgramBanner.order) {
				$scope.newMiniProgramBanner.order = $scope.miniProgramBanners.length
			}
			if($scope.newMiniProgramBanner.title && $scope.newMiniProgramBanner) {
				MiniProgramBanner.create($scope.newMiniProgramBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated")
						$scope.miniProgramBannerFormOn = false;
						$scope.newMiniProgramBanner = {};
					}
				});
			}
		};
		//cancel miniProgramBanner form
		$scope.cancelNewMiniProgramBannerForm = function() {
			$scope.miniProgramBannerFormOn = false;
		};
		//remove current miniProgramBanner
		$scope.removeMiniProgramBanner = function(miniProgramBanner) {
			if(miniProgramBanner) {
				MiniProgramBanner.delete(miniProgramBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success deleted");
					}
				});
			}
		}
		//show edit miniProgramBanner form
		$scope.showMiniProgramBannerEditForm = function(miniProgramBanner) {
			$scope.editingMiniProgramBannerId = miniProgramBanner._id;
			$scope.editingMiniProgramBanner = miniProgramBanner;
			$scope.editingMiniProgramBanner.neworder = miniProgramBanner.order;
		}
		//cancel editing miniProgramBanner form
		$scope.hideMiniProgramBannerEditForm = function() {
			$scope.editingMiniProgramBannerId = -1;
			$scope.editingMiniProgramBanner = {};
		}
		//update miniProgramBanner
		$scope.updateMiniProgramBanner = function (miniProgramBanner) {
			var newMiniProgramBanner = $scope.editingMiniProgramBanner;
			newMiniProgramBanner.order = $scope.editingMiniProgramBanner.neworder
			if($scope.editingMiniProgramBanner) {
				MiniProgramBanner.update(miniProgramBanner, newMiniProgramBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated");
						$scope.editingMiniProgramBannerId = -1;
					}
				});
			}
		}


		//*********** WebSubBanner related function ************//
		//show adding webSubBanner form
		$scope.showNewWebSubBannerForm = function() {
			if ($scope.webSubBannerFormOn) {
				$scope.webSubBannerFormOn = false;
			} else {
				$scope.webSubBannerFormOn = true;
			}
		}
		//add new webSubBanner
		$scope.addNewWebSubBanner = function() {
			if (!$scope.newWebSubBanner.order) {
				$scope.newWebSubBanner.order = $scope.webSubBanners.length
			}
			if($scope.newWebSubBanner.title && $scope.newWebSubBanner) {
				WebSubBanner.create($scope.newWebSubBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated")
						$scope.webSubBannerFormOn = false;
						$scope.newWebSubBanner = {};
					}
				});
			}
		};
		//cancel webSubBanner form
		$scope.cancelNewWebSubBannerForm = function() {
			$scope.webSubBannerFormOn = false;
		};
		//remove current webSubBanner
		$scope.removeWebSubBanner = function(webSubBanner) {
			if(webSubBanner) {
				WebSubBanner.delete(webSubBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success deleted");
					}
				});
			}
		}
		//show edit webSubBanner form
		$scope.showWebSubBannerEditForm = function(webSubBanner) {
			$scope.editingWebSubBannerId = webSubBanner._id;
			$scope.editingWebSubBanner = webSubBanner;
			$scope.editingWebSubBanner.neworder = webSubBanner.order;
		}
		//cancel editing webSubBanner form
		$scope.hideWebSubBannerEditForm = function() {
			$scope.editingWebSubBannerId = -1;
			$scope.editingWebSubBanner = {};
		}
		//update webSubBanner
		$scope.updateWebSubBanner = function (webSubBanner) {
			var newWebSubBanner = $scope.editingWebSubBanner;
			newWebSubBanner.order = $scope.editingWebSubBanner.neworder
			if($scope.editingWebSubBanner) {
				WebSubBanner.update(webSubBanner, newWebSubBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated");
						$scope.editingWebSubBannerId = -1;
					}
				});
			}
		}

		//*********** MiniProgramSubBanner related function ************//
		//show adding miniProgramSubBanner form
		$scope.showNewMiniProgramSubBannerForm = function() {
			if ($scope.miniProgramSubBannerFormOn) {
				$scope.miniProgramSubBannerFormOn = false;
			} else {
				$scope.miniProgramSubBannerFormOn = true;
			}
		}
		//add new miniProgramSubBanner
		$scope.addNewMiniProgramSubBanner = function() {
			if (!$scope.newMiniProgramSubBanner.order) {
				$scope.newMiniProgramSubBanner.order = $scope.miniProgramSubBanners.length
			}
			if($scope.newMiniProgramSubBanner.title && $scope.newMiniProgramSubBanner) {
				MiniProgramSubBanner.create($scope.newMiniProgramSubBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated")
						$scope.miniProgramSubBannerFormOn = false;
						$scope.newMiniProgramSubBanner = {};
					}
				});
			}
		};
		//cancel miniProgramSubBanner form
		$scope.cancelNewMiniProgramSubBannerForm = function() {
			$scope.miniProgramSubBannerFormOn = false;
		};
		//remove current miniProgramSubBanner
		$scope.removeMiniProgramSubBanner = function(miniProgramSubBanner) {
			if(miniProgramSubBanner) {
				MiniProgramSubBanner.delete(miniProgramSubBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success deleted");
					}
				});
			}
		}
		//show edit miniProgramSubBanner form
		$scope.showMiniProgramSubBannerEditForm = function(miniProgramSubBanner) {
			$scope.editingMiniProgramSubBannerId = miniProgramSubBanner._id;
			$scope.editingMiniProgramSubBanner = miniProgramSubBanner;
			$scope.editingMiniProgramSubBanner.neworder = miniProgramSubBanner.order;
		}
		//cancel editing miniProgramSubBanner form
		$scope.hideMiniProgramSubBannerEditForm = function() {
			$scope.editingMiniProgramSubBannerId = -1;
			$scope.editingMiniProgramSubBanner = {};
		}
		//update miniProgramSubBanner
		$scope.updateMiniProgramSubBanner = function (miniProgramSubBanner) {
			var newMiniProgramSubBanner = $scope.editingMiniProgramSubBanner;
			newMiniProgramSubBanner.order = $scope.editingMiniProgramSubBanner.neworder
			if($scope.editingMiniProgramSubBanner) {
				MiniProgramSubBanner.update(miniProgramSubBanner, newMiniProgramSubBanner).then(function(err) {
					if(err) {
						$scope.error = err.message;
						console.log($scope.error);
					} else {
						console.log("success updated");
						$scope.editingMiniProgramSubBannerId = -1;
					}
				});
			}
		}
	}])