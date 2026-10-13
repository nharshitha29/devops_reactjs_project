resource "azurerm_resource_group" "base" {
  name     = "myRG"
  location = "Central India"

}
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "myAKSCluster"
  location            = azurerm_resource_group.base.location
  resource_group_name = azurerm_resource_group.base.name
  dns_prefix          = "exampleaks"

  default_node_pool {
    name       = "aksdefault"
    node_count = 1
    vm_size    = "Standard_D4s_v3"
  }

  identity {
    type = "SystemAssigned"
  }

  tags = {
    Environment = terraform.workspace
  }
  
}