<?php

use CRM_HRContactActionsMenu_Component_GenericToolTipItem as GenericToolTipItem;

/**
 * Class CRM_Contactaccessrights_Component_ContactActionsMenu_GroupTitleToolTipTextItem
 */
class CRM_Contactaccessrights_Component_ContactActionsMenu_GroupTitleToolTipItem extends GenericToolTipItem {

  /**
   * Returns the Tooltip Text.
   *
   * @return string
   */
  public function getToolTipText() {
    $toolTipText = 'You can specify a user\&#39;s access to staff members by
      region or location by managing their regional access below.
      The user will then have access to contacts whose active
      roles place them in this region or location.
      For even more granular permissions, you can use ACL groups 
      <a href=/civicrm/admin/access>here</a>';

    return $toolTipText;
  }
}
