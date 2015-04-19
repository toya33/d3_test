using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.IO;

namespace Csharp_javascript_test
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            //String url = @"D:\OD\140717\20140717_D3js\step5.html";
            String url = @"step5.html";
            WebClient wc = new WebClient();
            Stream st = wc.OpenRead(url);

            StreamReader sr = new StreamReader(st, Encoding.GetEncoding("SJIS"));

            webBrowser1.DocumentText = sr.ReadToEnd();

            sr.Close();
            st.Close();
        }
    }
}
