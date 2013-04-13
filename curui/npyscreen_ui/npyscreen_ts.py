#coding=utf-8

import npyscreen

class form(npyscreen.Form):
    def create(self):
        self.myName = self.add(npyscreen.TitleText, name='Name')
        self.myDepartment = self.add(npyscreen.TitleText, name="departement")
        self.myDate = self.add(npyscreen.TitleDateCombo, name='date')

def myFunction(*args):
    F = form(name = "friend list", lines=40,columns = 30)
    F.edit()
    return F.myName.value + 'asdf'

if __name__ == "__main__":
    print npyscreen.wrapper_basic(myFunction)
